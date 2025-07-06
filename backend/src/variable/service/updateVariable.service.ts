import { Variable } from '@backend/template/service/variable.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, SqlEntityRepository } from '@mikro-orm/postgresql'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

type UpdateVariableData = Partial<Omit<Variable, 'id' | 'createdAt' | 'updatedAt' | 'template'>>

@Injectable()
export class UpdateVariableService {
  constructor(
    @InjectRepository(Variable)
    private readonly variableRepository: SqlEntityRepository<Variable>,
    private readonly em: EntityManager,
  ) {}

  async updateVariable(id: string, variableData: UpdateVariableData): Promise<Variable> {
    const entity = await this.variableRepository.findOne(id)

    if (!entity) {
      throw new HttpException(
        `Variable with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      )
    }

    this.em.assign(entity, variableData)

    await this.em.persistAndFlush(entity)

    return entity
  }
}