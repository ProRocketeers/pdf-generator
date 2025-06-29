import { CommonModule } from '@backend/common/common.module';
import { HealthModule } from '@backend/health/health.module';
import { TemplateModule } from '@backend/template/template.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PdfModule } from './pdf/pdf.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    HealthModule,
    TemplateModule,
    PdfModule,
  ],
})
export class AppModule {}
