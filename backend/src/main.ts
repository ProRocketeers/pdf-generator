import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from 'src/configs/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
