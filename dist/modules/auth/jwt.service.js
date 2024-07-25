"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const signing_types_enum_1 = require("./enums/signing-types.enum");
let JWTService = class JWTService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async SignAccessToken(payload, signingType) {
        try {
            let options = {
                secret: process.env.JWT_ACCESS_KEY_SECRET,
                expiresIn: '15m',
            };
            if (signingType === signing_types_enum_1.SigningType.OTPToken)
                options.expiresIn = '2m';
            return await this.jwtService.signAsync({ payload }, options);
        }
        catch (error) {
            throw error;
        }
    }
    async VerifyAccessToken(token) {
        try {
            const { payload } = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_KEY_SECRET,
            });
            return payload;
        }
        catch (error) {
            if (error instanceof jwt_1.TokenExpiredError)
                throw new common_1.UnauthorizedException('Token expired!');
            if (error instanceof jwt_1.JsonWebTokenError)
                throw new common_1.UnauthorizedException('invalid token');
            throw new common_1.UnauthorizedException('invalid token');
        }
    }
    async SignRefreshToken(payload) {
        try {
            return await this.jwtService.signAsync({ payload }, { expiresIn: '15m', secret: process.env.JWT_ACCESS_KEY_SECRET });
        }
        catch (error) {
            throw error;
        }
    }
    async VerifyRefreshToken(token) { }
};
JWTService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JWTService);
exports.JWTService = JWTService;
//# sourceMappingURL=jwt.service.js.map