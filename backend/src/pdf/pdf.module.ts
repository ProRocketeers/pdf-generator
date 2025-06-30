import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Template } from '@backend/template/template.entity'
import { PdfController } from './pdf.controller'
import { PdfService } from './service/pdf.service'
import { TemplateModule } from '@backend/template/template.module'

@Module({
  imports: [MikroOrmModule.forFeature([Template]), HttpModule, TemplateModule],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
