import { AuthService } from './auth.service';
import { AuthDto, CheckOTPDto } from './dto/auth.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    UserExistence(authDto: AuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    CheckOTP(checkOtpDto: CheckOTPDto): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
    }>;
}
