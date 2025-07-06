import { Variable } from '@backend/template/service/variable.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { EntityManager, SqlEntityRepository } from '@mikro-orm/postgresql'
import { InjectRepository } from '@mikro-orm/nestjs'

@Injectable()
export class DeleteVariableService {
  constructor(
    @InjectRepository(Variable)
    private readonly repository: SqlEntityRepository<Variable>,
    private readonly em: EntityManager,
  ) { }

  async deleteVariable(id: string): Promise<void> {
    const entity = await this.repository.findOne(id)

    if (!entity) {
      throw new HttpException(
        `Variable with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      )
    }

    await this.em.removeAndFlush(entity)
  }
}
