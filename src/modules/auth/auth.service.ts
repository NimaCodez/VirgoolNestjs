import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
	Scope,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthDto, CheckOTPDto } from './dto/auth.dto';
import { AuthType } from './enums/types.enum';
import { AuthMethod } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { OTP } from '../user/entities/otp.entity';
import { JWTService } from './jwt.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SigningType } from './enums/signing-types.enum';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		@InjectRepository(OTP) private otpRepo: Repository<OTP>,
		@Inject(REQUEST) private req: Request,
		private jwtService: JWTService,
	) {}

	async userExistence(authDto: AuthDto) {
		const { type, method, username } = authDto;
		switch (type) {
			case AuthType.Login:
				return await this.Login(method, username);
			case AuthType.Register:
				return await this.Register(method, username);
			default:
				throw new UnauthorizedException();
		}
	}

	async Login(method: AuthMethod, username: string) {
		const ValidatedUserInput = await this.UserInputValidation(method, username);
		let user: User = await this.CheckExistence(method, ValidatedUserInput);
		if (!user) throw new UnauthorizedException('user not found');

		const otp = await this.CreateAndSaveOTP(user.id);
		const token = await this.jwtService.SignAccessToken(
			{ userId: user.id },
			SigningType.OTPToken,
		);

		return {
			message: `OTP was sent to your ${method} successfully`,
			token,
			code: otp.code,
		};
	}

	async Register(method: AuthMethod, username: string) {
		if (method === AuthMethod.Username)
			throw new BadRequestException('username is not valid for signup');

		const ValidatedUserInput = await this.UserInputValidation(method, username);
		let user: User = await this.CheckExistence(method, ValidatedUserInput);
		if (user) throw new ConflictException('user already exists');
		user = this.userRepo.create({
			[method]: username,
			username: `m_${await this.GetRandomNumber()}`,
		});

		user = await this.userRepo.save(user);

		const otp = await this.CreateAndSaveOTP(user.id);
		const token = await this.jwtService.SignAccessToken(
			{ userId: user.id },
			SigningType.OTPToken,
		);

		return {
			message: `OTP was sent to your ${method} successfully`,
			token,
			code: otp.code,
		};
	}

	async CheckExistence(method: AuthMethod, username: string) {
		if (
			method !== AuthMethod.Phone &&
			method !== AuthMethod.Email &&
			method !== AuthMethod.Username
		)
			throw new BadRequestException('Authentication method not supported');

		const user: User = await this.userRepo.findOneBy({ [method]: username });
		return user;
	}

	async UserInputValidation(method: AuthMethod, username: string) {
		switch (method) {
			case AuthMethod.Email:
				if (isEmail(username)) return username;
				throw new BadRequestException('email is not valid');
			case AuthMethod.Phone:
				if (isMobilePhone(username, 'fa-IR')) return username;
				throw new BadRequestException('phone is not valid');
			case AuthMethod.Username:
				return username;

			default:
				throw new UnauthorizedException();
		}
	}

	async SendOTP(method: AuthMethod, username: string) {
		let user: User = await this.userRepo.findOneBy({ [method]: username });
		if (!user) throw new UnauthorizedException('user not found');
		await this.CreateAndSaveOTP(user.id);

		return {
			message: `Code was sent to your ${method} successfully`,
		};
	}

	async GetRandomNumber() {
		return Math.floor(Math.random() * 900000 + 100000);
	}

	async GetExpiryTime() {
		return new Date(new Date().getTime() + 2 * 60 * 1000);
	}

	async CreateAndSaveOTP(userId: number) {
		let otp = await this.otpRepo.findOneBy({ userId });
		if (otp && new Date().getTime() < otp.expiresIn.getTime())
			throw new BadRequestException('You can have new code after 2 minutes');

		let otpExists = false;
		if (!otp) {
			otp = this.otpRepo.create({
				code: (await this.GetRandomNumber()).toString(),
				expiresIn: await this.GetExpiryTime(),
				userId,
			});
		} else {
			otpExists = true;
			otp.code = (await this.GetRandomNumber()).toString();
			otp.expiresIn = await this.GetExpiryTime();
			otp.userId = userId;
		}

		otp = await this.otpRepo.save(otp);

		if (!otpExists)
			await this.userRepo.update({ id: userId }, { otpId: otp.id });

		return otp;
	}

	async CheckOTP(data: CheckOTPDto) {
		const token = this.req.cookies?.['otp'];
		if (!token) throw new UnauthorizedException('token expired or not found.');

		const { userId } = await this.jwtService.VerifyAccessToken(token);
		const otp = await this.otpRepo.findOneBy({ userId });

		if (!otp)
			throw new UnauthorizedException(
				'Please login or signup to receive a code.',
			);
		else if (otp && data.code != otp.code)
			throw new UnauthorizedException('code is incorrect.');
		else if (otp && new Date().getTime() > otp.expiresIn.getTime())
			throw new UnauthorizedException('code expired.');

		const accessToken = await this.jwtService.SignAccessToken(
			{ userId },
			SigningType.AccessToken,
		);
		const refreshToken = await this.jwtService.SignRefreshToken({ userId });

		return {
			message: 'You logged in successfully',
			accessToken,
			refreshToken,
		};
	}
}
