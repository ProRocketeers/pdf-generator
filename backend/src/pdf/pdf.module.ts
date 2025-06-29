import { GetTemplateListService } from '@backend/template/getTemplateList.service'
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Template } from '@backend/template/template.entity'
import { PdfController } from './pdf.controller'
import { PdfService } from './service/pdf.service'

@Module({
  imports: [MikroOrmModule.forFeature([Template]), HttpModule],
  controllers: [PdfController],
  providers: [GetTemplateListService, PdfService],
  exports: [PdfService],
})
export class PdfModule {}
