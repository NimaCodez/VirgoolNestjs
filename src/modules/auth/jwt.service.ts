import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './types/payload.type';
import { JwtService } from '@nestjs/jwt';
import { SigningType } from './enums/signing-types.enum';

@Injectable()
export class JWTService {
	constructor(private jwtService: JwtService) {}

	async SignAccessToken(payload: Payload, signingType: SigningType) {
		try {
			let options = {
				secret: process.env.JWT_ACCESS_KEY_SECRET,
				expiresIn: '15m',
			};
			if (signingType === SigningType.OTPToken) options.expiresIn = '2m';

			return await this.jwtService.signAsync({ payload }, options);
		} catch (error) {
			throw error;
		}
	}
	
	async VerifyAccessToken(token: string): Promise<Payload> {
		try {
			const { payload } = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_ACCESS_KEY_SECRET,
			});

			return payload;
		} catch (error) {
			throw new UnauthorizedException('invalid token');
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

	async VerifyRefreshToken(token: string) {}
}
