import { GetTemplateListService } from '@backend/template/service/getTemplateList.service'
import { UpdateTemplateService } from '@backend/template/service/updateTemplate.service'
import { DeleteTemplateService } from '@backend/template/service/deleteTemplate.service'
import { CreateTemplateService } from '@backend/template/service/createTemplate.service'
import { GetTemplateService } from '@backend/template/service/getTemplate.service'
import { TemplateController } from '@backend/template/template.controller'
import { Template } from '@backend/template/service/template.entity'
import { Variable } from '@backend/template/service/variable.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Template, Variable])],
  controllers: [TemplateController],
  providers: [
    GetTemplateListService,
    GetTemplateService,
    CreateTemplateService,
    DeleteTemplateService,
    UpdateTemplateService,
  ],
  exports: [GetTemplateService],
})

export class TemplateModule { }
