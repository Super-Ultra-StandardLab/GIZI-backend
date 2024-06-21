const dotenv = require('dotenv');
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { setupSwagger } from './global/config/swagger/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useStaticAssets(join(__dirname, '../images'), { prefix: '/image/' });
  setupSwagger(app);
  await app.listen(process.env.PORT_NUMBER);
}
bootstrap();
