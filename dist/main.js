"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
const swagger_config_1 = require("./config/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagger_config_1.configSwagger)(app);
    await app.listen(process.env.PORT || 3000, () => console.log(`Listening on http://localhost:${process.env.PORT || 3000}`, `\nAPI Docs: http://localhost:${process.env.PORT || 3000}/api-docs`));
}
bootstrap();
//# sourceMappingURL=main.js.map