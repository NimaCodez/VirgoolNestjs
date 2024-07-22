import { EntityBase } from 'src/common/abstracts/base.entity';
import { OTP } from './otp.entity';
export declare class User extends EntityBase {
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
    otpId: number;
    otp: OTP;
    createdAt: Date;
    updatedAt: Date;
}
