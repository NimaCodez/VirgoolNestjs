import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
	Scope,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { REQUEST } from '@nestjs/core';
import { ChangeUsernameDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		@InjectRepository(Profile) private profileRepo: Repository<Profile>,
		@Inject(REQUEST) private request: Request,
	) {}

	async changeProfile(
		files: Express.Multer.File,
		updateProfileDto: UpdateProfileDto,
	) {
		const updates = this.FilterUpdates(updateProfileDto);
		if (Object.keys(updates).length === 0)
			throw new BadRequestException('Nothing was updated');

		const { id: userId } = this.request.user;
		let profile = await this.profileRepo.findOneBy({ userId });

		this.ExtractImages(files, updates);
		this.LowerSocialIDsCase(updates as UpdateProfileDto);

		const duplicates = await this.CheckDuplicateFields(
			updates as UpdateProfileDto,
		);
		if (duplicates.length > 0) {
			throw new BadRequestException(
				`Your ${duplicates.join(', ')} already exists`,
			);
		}

		if (profile) {
			Object.assign(profile, updates);
			profile = await this.profileRepo.save(profile);
		} else {
			profile = this.profileRepo.create({ ...profile, userId });
			Object.assign(profile, updates);
			profile = await this.profileRepo.save(profile);
			await this.userRepo.update({ id: userId }, { profileId: profile.id });
		}

		return {
			message: 'Profile Updated successfully.',
		};
	}

	async changeUsername(username: string) {
		const { id } = this.request.user;
		const user = await this.userRepo.findOneBy({ username });

		if (user && user?.id !== id) {
			throw new ConflictException('Username already exists');
		} else if (user && user.id === id) {
			return {
				message: 'username updated',
			};
		}

		await this.userRepo.update({ id }, { username });
		return {
			message: 'username updated',
		}
	}

	findAll(request: Request) {
		return request.user;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}

	private FilterUpdates(dto: UpdateProfileDto): Partial<UpdateProfileDto> {
		return Object.fromEntries(
			Object.entries(dto).filter(
				([_, value]) => value !== null && value !== undefined,
			),
		);
	}

	private ExtractImages(files: Express.Multer.File, updates) {
		const { avatar, bgImage } = files;

		if (avatar && avatar.length > 0) {
			let [image] = avatar;
			updates.avatar = image.path.split('public')[1].replace(/\\/g, '/');
		}
		if (bgImage && bgImage.length > 0) {
			let [image] = bgImage;
			updates.bgImage = image.path.split('public')[1].replace(/\\/g, '/');
		}
	}

	private LowerSocialIDsCase(updateDto: UpdateProfileDto) {
		const { linkedin, twitter, nickname } = updateDto;
		updateDto.linkedin = linkedin?.toLowerCase();
		updateDto.twitter = twitter?.toLowerCase();
		updateDto.nickname = nickname?.toLowerCase();
	}

	private async CheckDuplicateFields(updates: UpdateProfileDto) {
		const { linkedin, twitter, nickname } = updates;

		let duplicates = [];

		if (linkedin) {
			const result = await this.profileRepo.findAndCount({
				where: {
					linkedin,
				},
			});

			if (result[1] > 0) duplicates.push('linkedin');
		}

		if (twitter) {
			const result = await this.profileRepo.findAndCount({
				where: {
					twitter,
				},
			});

			if (result[1] > 0) duplicates.push('twitter');
		}

		if (nickname) {
			const result = await this.profileRepo.findAndCount({
				where: {
					nickname,
				},
			});

			if (result[1] > 0) duplicates.push('nickname');
		}

		return duplicates;
	}
}
