import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { configSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	configSwagger(app);
	app.useStaticAssets('public')
	app.use(cookieParser('687fe94df7e8c35c'))
	app.use(morgan('dev'))
	app.useGlobalPipes(new ValidationPipe())

	await app.listen(process.env.PORT || 3000, () =>
		console.log(
			`Listening on http://localhost:${process.env.PORT || 3000}`,
			`\nAPI Docs: http://localhost:${process.env.PORT || 3000}/api-docs`,
		),
	);
}
bootstrap();
