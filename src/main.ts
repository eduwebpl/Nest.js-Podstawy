import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new DatabaseExceptionFilter(configService));

  const PORT = configService.get('PORT');
  await app.listen(PORT);
  console.log(`My server is running on port ${PORT}`);
}

bootstrap();
