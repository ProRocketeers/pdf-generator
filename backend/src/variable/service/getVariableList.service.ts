import { mapVariableToDto, Variable } from '@backend/template/service/variable.entity'
import { VariableDto } from '@backend/template/variable.dto'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetVariableListService {
  constructor(
    @InjectRepository(Variable)
    private readonly repository: EntityRepository<Variable>,
  ) {}

  async getVariableList(): Promise<VariableDto[]> {
    const entities = await this.repository.findAll()

    return entities.map(mapVariableToDto)
  }

  async getVariableListByTemplateId(templateId: string): Promise<VariableDto[]> {
    const entities = await this.repository.find({ template: templateId })

    if (!entities || entities.length === 0) {
      return []
    }

    return entities.map(mapVariableToDto)
  }
}
