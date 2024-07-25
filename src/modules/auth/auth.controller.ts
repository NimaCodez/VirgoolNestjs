import {
	Body,
	Controller,
	Get,
	InternalServerErrorException,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDto, CheckOTPDto } from './dto/auth.dto';
import { SwaggerConsumes } from 'src/common/enum/swagger-consumes.enum';
import { Request, Response } from 'express';
import { AuthUser } from './guards/auth.guard';

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

	@Get('logged-in-user')
	@ApiBearerAuth('Authorization')
	@UseGuards(AuthUser)
	async GetLoggedInUser(@Req() req: Request) {
		return req.user;
	}
}
