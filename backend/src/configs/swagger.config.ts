import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../../package.json';
import { ConfigService } from '@nestjs/config';

export const configureSwagger = (app: NestExpressApplication) => {
  const configService = app.get(ConfigService);
  const basePath = configService.get<string>('BASE_PATH') || '';

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PDF Generator')
    .setVersion(version)
    .addServer(basePath, 'PDF Generator')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  });
};
