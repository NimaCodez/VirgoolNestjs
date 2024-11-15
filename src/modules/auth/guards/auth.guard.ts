import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JWTService } from '../jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { isJWT } from 'class-validator';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthUser implements CanActivate {
	constructor(
		@InjectRepository(User) private userRepo: Repository<User>,
		private jwtService: JWTService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest<Request>();

		try {
			const token = await this.ExtractAndVerifyToken(request);

			const { userId } = await this.jwtService.VerifyAccessToken(token);
			const user = await this.userRepo.findOneBy({ id: userId });
			if (!user) throw new NotFoundException('User was not found.');

			request.user = user;
			return true;
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				throw new BadRequestException('Token expired!');
			}
			throw new UnauthorizedException('Sth went wrong', {
				cause: new Error(error),
				description: error,
			});
		}
	}

	protected async ExtractAndVerifyToken(request: Request) {
		const { authorization } = request.headers;
		if (!authorization || authorization?.trim() === '')
			throw new UnauthorizedException('Login to your account.');

		const [bearer, token] = authorization.split(' ');
		if (bearer?.toLowerCase() !== 'bearer' || !token || !isJWT(token))
			throw new UnauthorizedException('Invalid Token');

		return token;
	}
}
