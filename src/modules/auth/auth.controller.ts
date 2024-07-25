import {
	Body,
	Controller,
	InternalServerErrorException,
	Post,
	Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOTPDto } from './dto/auth.dto';
import { SwaggerConsumes } from 'src/common/enum/swagger-consumes.enum';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('user-existence')
	@ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
	async UserExistence(@Body() authDto: AuthDto, @Res() res: Response) {
		const result = await this.authService.userExistence(authDto);
		res.cookie('otp', result.token, {
			httpOnly: true,
			expires: new Date(new Date().getTime() + 1000 * 60 * 2),
		});
		return res.json({
			message: 'Sending Code was successful',
			code: result.code,
		});
	}

	@Post('check-otp')
	@ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
	async CheckOTP(@Body() checkOtpDto: CheckOTPDto) {
		return this.authService.CheckOTP(checkOtpDto);
	}
}
