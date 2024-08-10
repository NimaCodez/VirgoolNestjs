import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { User } from '../user/entities/user.entity';
import { OTP } from '../user/entities/otp.entity';
import { TimeToStudyMiddleware } from './middlewares/time-to-study.middleware';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Blog, User, OTP])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimeToStudyMiddleware).forRoutes('/')
  }
}
