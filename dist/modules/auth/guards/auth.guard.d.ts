/// <reference types="cookie-parser" />
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JWTService } from '../jwt.service';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthUser implements CanActivate {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JWTService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    protected ExtractAndVerifyToken(request: Request): Promise<string>;
}
