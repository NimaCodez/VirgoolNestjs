import { AuthMethod } from '../enums/method.enum';
export declare class AuthDto {
    username: string;
    type: string;
    method: AuthMethod;
}
export declare class CheckOTPDto {
    code: string;
}
