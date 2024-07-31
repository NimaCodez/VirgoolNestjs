import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { REQUEST } from '@nestjs/core';
import { UpdateProfileDto } from './dto/profile.dto';

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
		const { id: userId, profileId } = this.request.user;
		let profile = await this.profileRepo.findOneBy({ userId });

		const updates = this.FilterUpdates(updateProfileDto);
		if (Object.keys(updates).length === 0)
			throw new BadRequestException('Nothing was updated');

		const { avatar, bgImage } = files;
		
		if (avatar.length > 0) {
			let [image] = avatar;
			updates.avatar = image.path.split('public')[1].replace(/\\/g, '/');
		}
		if (bgImage.length > 0) {
			let [image] = bgImage;
			updates.bgImage = image.path.split('public')[1].replace(/\\/g, '/');
		}

		if (profile) {
			Object.assign(profile, updates);
			profile = await this.profileRepo.save(profile);
		} else {
			profile = this.profileRepo.create({ ...profile, userId });
			Object.assign(profile, updates);
		}

		profile = await this.profileRepo.save(profile);

		if (!profileId) {
			await this.userRepo.update({ id: userId }, { profileId: profile.id });
		}
	}

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user';
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
}
