import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function configSwagger(app: INestApplication): void {
	const document = new DocumentBuilder()
		.setTitle("Virgool's API")
		.setDescription('For learning more.')
		.setContact('Github', 'https://github.com/NimaCodez', 'nimacodes@gmail.com')
		.setVersion('v0.0.1')
		.addBearerAuth(swaggerAuthConfig(), 'Authorization')
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, document);

	SwaggerModule.setup('/api-docs', app, swaggerDocument);
}

function swaggerAuthConfig(): SecuritySchemeObject {
	return {
		type: 'http',
		bearerFormat: 'JWT',
		in: 'header',
		scheme: 'bearer'
	}
}
