import {
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
            if (!user) throw new NotFoundException('User was not found.')

            request.user = user;
			return true;
		} catch (error) {
			throw new UnauthorizedException(error);
		}
	}

	protected async ExtractAndVerifyToken(request: Request) {
		const { authorization } = request.headers;
		if (!authorization || authorization?.trim() === '')
			throw new UnauthorizedException('Login to your account.');

		const [bearer, token] = authorization.split(' ');
		if (bearer?.toLocaleLowerCase() !== 'bearer' || !token || !isJWT(token))
			throw new UnauthorizedException('Invalid Token');

		return token;
	}
}
