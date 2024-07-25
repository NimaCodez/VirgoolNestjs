import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JWTService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './guards/auth.guard';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JWTService, JwtService],
})
export class AuthModule {}
