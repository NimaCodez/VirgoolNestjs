import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../../config/typeorm.config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: join(process.cwd(), '.env'),
      isGlobal: true
		}),
    TypeOrmModule.forRoot(typeormConfig()),
	AuthModule,
    UserModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
