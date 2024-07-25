"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
const swagger_config_1 = require("./config/swagger.config");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagger_config_1.configSwagger)(app);
    app.use(cookieParser('687fe94df7e8c35c'));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT || 3000, () => console.log(`Listening on http://localhost:${process.env.PORT || 3000}`, `\nAPI Docs: http://localhost:${process.env.PORT || 3000}/api-docs`));
}
bootstrap();
//# sourceMappingURL=main.js.map