import { AuthDto } from './dto/auth.dto';
import { AuthMethod } from './enums/method.enum';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { OTP } from '../user/entities/otp.entity';
import { JWTService } from './jwt.service';
export declare class AuthService {
    private userRepo;
    private otpRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, otpRepo: Repository<OTP>, jwtService: JWTService);
    userExistence(authDto: AuthDto): Promise<{
        message: string;
        token: string;
        code: string;
    }>;
    Login(method: AuthMethod, username: string): Promise<{
        message: string;
        token: string;
        code: string;
    }>;
    Register(method: AuthMethod, username: string): Promise<{
        message: string;
        token: string;
        code: string;
    }>;
    CheckExistence(method: AuthMethod, username: string): Promise<User>;
    UserInputValidation(method: AuthMethod, username: string): Promise<string>;
    SendOTP(method: AuthMethod, username: string): Promise<{
        message: string;
    }>;
    GetRandomNumber(): Promise<number>;
    GetExpiryTime(): Promise<Date>;
    CreateAndSaveOTP(userId: number): Promise<OTP>;
    CheckOTP(): Promise<void>;
}
