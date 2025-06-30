import { AppModule } from '@backend/app.module';
import { configureSwagger } from '@backend/configs/swagger.config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
