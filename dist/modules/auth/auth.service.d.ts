import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    userExistence(authDto: AuthDto): Promise<AuthDto>;
}
