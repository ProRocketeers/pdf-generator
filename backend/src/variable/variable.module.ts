import { GetVariableListService } from '@backend/variable/service/getVariableList.service'
import { DeleteVariableService } from '@backend/variable/service/deleteVariable.service'
import { CreateVariableService } from '@backend/variable/service/createVariable.service'
import { UpdateVariableService } from '@backend/variable/service/updateVariable.service'
import { GetVariableService } from '@backend/variable/service/getVariable.service'
import { VariableController } from '@backend/variable/variable.controller'
import { Variable } from '@backend/template/service/variable.entity'
import { TemplateModule } from '@backend/template/template.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Variable]), TemplateModule],
  controllers: [VariableController],
  providers: [
    GetVariableListService,
    GetVariableService,
    CreateVariableService,
    DeleteVariableService,
    UpdateVariableService,
  ],
  exports: [],
})

export class VariableModule { }
