import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../../package.json';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('PDF Generator')
  .setVersion(version)
  .build();

export const configureSwagger = (app: NestExpressApplication) => {
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, documentFactory, {
    yamlDocumentUrl: 'swagger/yaml',
  });
};
