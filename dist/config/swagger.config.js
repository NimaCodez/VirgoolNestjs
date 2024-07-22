"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function configSwagger(app) {
    const document = new swagger_1.DocumentBuilder()
        .setTitle('Virgool\'s API')
        .setDescription('For learning more.')
        .setContact('Github', 'https://github.com/NimaCodez', 'nimacodes@gmail.com')
        .setVersion('v0.0.1')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, document);
    swagger_1.SwaggerModule.setup('/api-docs', app, swaggerDocument);
}
exports.configSwagger = configSwagger;
//# sourceMappingURL=swagger.config.js.map