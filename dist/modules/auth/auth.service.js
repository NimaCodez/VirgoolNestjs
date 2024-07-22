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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const types_enum_1 = require("./enums/types.enum");
const method_enum_1 = require("./enums/method.enum");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("../user/entities/profile.entity");
const otp_entity_1 = require("../user/entities/otp.entity");
let AuthService = class AuthService {
    constructor(userRepo, profileRepo, otpRepo) {
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
        this.otpRepo = otpRepo;
    }
    async userExistence(authDto) {
        const { type, method, username } = authDto;
        console.log(method);
        switch (type) {
            case types_enum_1.AuthType.Login:
                return this.Login(method, username);
            case types_enum_1.AuthType.Register:
                return this.Register(method, username);
            default:
                throw new common_1.UnauthorizedException();
        }
    }
    async Login(method, username) {
        const ValidatedUserInput = await this.UserInputValidation(method, username);
        let user = await this.CheckExistence(method, ValidatedUserInput);
        if (!user)
            throw new common_1.UnauthorizedException('user not found');
        const otp = await this.CreateAndSaveOTP(user.id);
        return {
            code: otp.code,
        };
    }
    async Register(method, username) {
        if (method === method_enum_1.AuthMethod.Username)
            throw new common_1.BadRequestException('username is not valid for signup');
        const ValidatedUserInput = await this.UserInputValidation(method, username);
        let user = await this.CheckExistence(method, ValidatedUserInput);
        if (user)
            throw new common_1.ConflictException('user already exists');
        user = this.userRepo.create({
            [method]: username,
            username: `m_${await this.GetRandomNumber()}`,
        });
        user = await this.userRepo.save(user);
        const otp = await this.CreateAndSaveOTP(user.id);
        return {
            code: otp.code,
        };
    }
    async CheckExistence(method, username) {
        if (method !== method_enum_1.AuthMethod.Phone &&
            method !== method_enum_1.AuthMethod.Email &&
            method !== method_enum_1.AuthMethod.Username)
            throw new common_1.BadRequestException('Authentication method not supported');
        const user = await this.userRepo.findOneBy({ [method]: username });
        return user;
    }
    async UserInputValidation(method, username) {
        switch (method) {
            case method_enum_1.AuthMethod.Email:
                if ((0, class_validator_1.isEmail)(username))
                    return username;
                throw new common_1.BadRequestException('email is not valid');
            case method_enum_1.AuthMethod.Phone:
                if ((0, class_validator_1.isMobilePhone)(username, 'fa-IR'))
                    return username;
                throw new common_1.BadRequestException('phone is not valid');
            case method_enum_1.AuthMethod.Username:
                return username;
            default:
                throw new common_1.UnauthorizedException();
        }
    }
    async SendOTP(method, username) {
        let user = await this.userRepo.findOneBy({ [method]: username });
        if (!user)
            throw new common_1.UnauthorizedException('user not found');
        await this.CreateAndSaveOTP(user.id);
        return {
            message: `Code was sent to your ${method} successfully`,
        };
    }
    async GetRandomNumber() {
        return Math.floor(Math.random() * 900000 + 100000);
    }
    async GetExpiryTime() {
        return new Date(new Date().getTime() + 2 * 60 * 1000);
    }
    async CreateAndSaveOTP(userId) {
        let otp = await this.otpRepo.findOneBy({ userId });
        if (otp && new Date().getTime() < otp.expiresIn.getTime())
            throw new common_1.BadRequestException('You can have new code after 2 minutes');
        let otpExists = false;
        if (!otp) {
            otp = this.otpRepo.create({
                code: (await this.GetRandomNumber()).toString(),
                expiresIn: await this.GetExpiryTime(),
                userId,
            });
        }
        else {
            otpExists = true;
            otp.code = (await this.GetRandomNumber()).toString();
            otp.expiresIn = await this.GetExpiryTime();
            otp.userId = userId;
        }
        otp = await this.otpRepo.save(otp);
        console.log('otp: -- ', otp);
        if (!otpExists)
            await this.userRepo.update({ id: userId }, { otpId: otp.id });
        return otp;
    }
    async CheckOTP() { }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __param(2, (0, typeorm_1.InjectRepository)(otp_entity_1.OTP)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map