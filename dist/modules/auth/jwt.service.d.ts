import { Payload } from './types/payload.type';
import { JwtService } from '@nestjs/jwt';
import { SigningType } from './enums/signing-types.enum';
export declare class JWTService {
    private jwtService;
    constructor(jwtService: JwtService);
    SignAccessToken(payload: Payload, signingType: SigningType): Promise<string>;
    VerifyAccessToken(token: string): Promise<Payload>;
    SignRefreshToken(payload: Payload): Promise<string>;
    VerifyRefreshToken(token: string): Promise<void>;
}
