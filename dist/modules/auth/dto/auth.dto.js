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
exports.CheckOTPDto = exports.AuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const types_enum_1 = require("../enums/types.enum");
const class_validator_1 = require("class-validator");
const method_enum_1 = require("../enums/method.enum");
class AuthDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 50),
    __metadata("design:type", String)
], AuthDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: types_enum_1.AuthType }),
    (0, class_validator_1.IsEnum)(types_enum_1.AuthType),
    __metadata("design:type", String)
], AuthDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: method_enum_1.AuthMethod }),
    (0, class_validator_1.IsEnum)(method_enum_1.AuthMethod),
    __metadata("design:type", String)
], AuthDto.prototype, "method", void 0);
exports.AuthDto = AuthDto;
class CheckOTPDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 6),
    __metadata("design:type", String)
], CheckOTPDto.prototype, "code", void 0);
exports.CheckOTPDto = CheckOTPDto;
//# sourceMappingURL=auth.dto.js.map