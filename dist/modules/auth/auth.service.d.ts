import { AuthDto } from './dto/auth.dto';
import { AuthMethod } from './enums/method.enum';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from '../user/entities/profile.entity';
import { OTP } from '../user/entities/otp.entity';
export declare class AuthService {
    private userRepo;
    private profileRepo;
    private otpRepo;
    constructor(userRepo: Repository<User>, profileRepo: Repository<Profile>, otpRepo: Repository<OTP>);
    userExistence(authDto: AuthDto): Promise<{
        code: string;
    }>;
    Login(method: AuthMethod, username: string): Promise<{
        code: string;
    }>;
    Register(method: AuthMethod, username: string): Promise<{
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
