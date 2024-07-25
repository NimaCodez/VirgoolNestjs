import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    userExistence(authDto: AuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
