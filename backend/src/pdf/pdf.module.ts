import { PdfController } from '@backend/pdf/pdf.controller';
import { PdfService } from '@backend/pdf/service/pdf.service';
import { Template } from '@backend/template/service/template.entity';
import { TemplateModule } from '@backend/template/template.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature([Template]), HttpModule, TemplateModule],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
