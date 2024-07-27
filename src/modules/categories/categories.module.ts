import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
	imports: [AuthModule, UserModule, TypeOrmModule.forFeature([Category])],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
