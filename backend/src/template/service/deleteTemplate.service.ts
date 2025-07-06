import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Template } from './template.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, SqlEntityRepository } from '@mikro-orm/postgresql'
import { Variable } from './variable.entity'


@Injectable()
export class DeleteTemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: SqlEntityRepository<Template>,
    @InjectRepository(Variable)
    private readonly variableRepository: SqlEntityRepository<Variable>,
    private readonly em: EntityManager,
  ) { }

  async deleteTemplate(id: string): Promise<void> {
    const entity = await this.templateRepository.findOne(id)

    if (!entity) {
      throw new HttpException(
        `Template with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      )
    }

    await this.variableRepository.nativeDelete({ template: id });

    await this.em.removeAndFlush(entity)
  }
}