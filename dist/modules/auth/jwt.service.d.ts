import { Payload } from './types/payload.type';
import { JwtService } from '@nestjs/jwt';
export declare class JWTService {
    private jwtService;
    constructor(jwtService: JwtService);
    SignAccessToken(payload: Payload): Promise<string>;
    SignRefreshToken(payload: Payload): Promise<string>;
    VerifyAccessToken(token: string): Promise<any>;
    VerifyRefreshToken(token: string): Promise<void>;
}
