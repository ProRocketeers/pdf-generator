import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('PDF Generator')
  .setVersion('1.0')
  .build();

export const configureSwagger = (app: NestExpressApplication) => {
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/swagger', app, documentFactory, {
    yamlDocumentUrl: 'api/v1/swagger/yaml',
  });
};
