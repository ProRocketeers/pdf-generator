import { AppModule } from '@backend/app.module';
import { configureSwagger } from '@backend/configs/swagger.config';
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const prefix = configService.get<string>('BASE_PATH') || '';

  if (prefix) {
    app.setGlobalPrefix(prefix);
  }

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
