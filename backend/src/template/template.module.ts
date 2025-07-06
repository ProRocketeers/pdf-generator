import { GetTemplateListService } from '@backend/template/service/getTemplateList.service'
import { GetTemplateService } from '@backend/template/service/getTemplate.service'
import { TemplateController } from '@backend/template/template.controller'
import { Template } from '@backend/template/service/template.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [GetTemplateListService, GetTemplateService],
  exports: [GetTemplateService],
})
export class TemplateModule { }
