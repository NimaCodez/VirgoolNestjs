import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enums/types.enum';
import { AuthMethod } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { OTP } from '../user/entities/otp.entity';
import { JWTService } from './jwt.service';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		@InjectRepository(OTP) private otpRepo: Repository<OTP>,
		private jwtService: JWTService,
	) {}

	async userExistence(authDto: AuthDto) {
		const { type, method, username } = authDto;
		console.log(method);
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
		const token = await this.jwtService.SignAccessToken({ id: user.id });

		console.log(token)

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
		const token = await this.jwtService.SignAccessToken({ id: user.id });

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

	async CheckOTP() {}
}
