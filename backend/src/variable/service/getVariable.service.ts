import { mapVariableToDto, Variable } from '@backend/template/service/variable.entity'
import { VariableDto } from '@backend/template/variable.dto'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class GetVariableService {
  constructor(
    @InjectRepository(Variable)
    private readonly repository: EntityRepository<Variable>,
  ) { }

  async getVariable(id: string): Promise<VariableDto> {
    const entity = await this.repository.findOne(id)

    if (!entity) {
      throw new HttpException(
        `Variable with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      )
    }

    return mapVariableToDto(entity)
  }
}