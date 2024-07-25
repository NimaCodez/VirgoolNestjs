import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JWTService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { OTP } from '../user/entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OTP])],
  controllers: [AuthController],
  providers: [AuthService, JWTService, JwtService],
  exports: [AuthModule, JWTService]
})
export class AuthModule {}
