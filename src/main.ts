import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { configSwagger } from './config/swagger.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	configSwagger(app);
	await app.listen(process.env.PORT || 3000, () =>
		console.log(
			`Listening on http://localhost:${process.env.PORT || 3000}`,
			`\nAPI Docs: http://localhost:${process.env.PORT || 3000}/api-docs`,
		),
	);
}
bootstrap();
