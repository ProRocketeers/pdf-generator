import { mapVariableToDto, Variable } from '@backend/template/service/variable.entity'
import { VariableDto } from '@backend/template/variable.dto'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, RequiredEntityData, SqlEntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateVariableService {
  constructor(
    @InjectRepository(Variable)
    private readonly repository: SqlEntityRepository<Variable>,
    private readonly em: EntityManager,
  ) {}

  async createVariable(variableData: RequiredEntityData<Variable>): Promise<VariableDto> {
    const entity = this.repository.create(variableData)

    await this.em.persistAndFlush(entity)

    return mapVariableToDto(entity)
  }
}
