import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    async userExistence(authDto: AuthDto) {
		return authDto;
	}
}
