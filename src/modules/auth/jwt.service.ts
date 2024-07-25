import { Injectable } from '@nestjs/common';
import { Payload } from './types/payload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
	constructor(private jwtService: JwtService) {}

	async SignAccessToken(payload: Payload) {
		try {
			return await this.jwtService.signAsync(
				{ payload },
				{ expiresIn: '15m', secret: process.env.JWT_ACCESS_KEY_SECRET },
			);
		} catch (error) {
			throw error;
		}
	}

	async SignRefreshToken(payload: Payload) {
		try {
			return await this.jwtService.signAsync(
				{ payload },
				{ expiresIn: '15m', secret: process.env.JWT_ACCESS_KEY_SECRET },
			);
		} catch (error) {
			throw error;
		}
	}

	async VerifyAccessToken(token: string) {
		try {
			return await this.jwtService.verifyAsync(token);
		} catch (error) {
			throw error;
		}
	}

	async VerifyRefreshToken(token: string) {}
}
