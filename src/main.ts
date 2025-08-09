import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from 'nestjs-pino';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || true,
    credentials: true,
  });

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Tasky API')
    .setDescription('Mini project - Task Management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);

  const logger = app.get(Logger);
  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(`📘 Swagger: http://localhost:${port}/api`);
}
bootstrap();
