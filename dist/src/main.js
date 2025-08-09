"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const nestjs_pino_1 = require("nestjs-pino");
dotenv.config();
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.enableCors({
        origin: ((_a = process.env.CORS_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(',')) || true,
        credentials: true,
    });
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Tasky API')
        .setDescription('Mini project - Task Management')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableShutdownHooks();
    const port = Number(process.env.PORT) || 3000;
    await app.listen(port);
    const logger = app.get(nestjs_pino_1.Logger);
    logger.log(`🚀 Server running on http://localhost:${port}`);
    logger.log(`📘 Swagger: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map