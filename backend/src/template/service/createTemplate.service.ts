import { Injectable } from '@nestjs/common'
import { mapTemplateToDto, Template } from './template.entity'
import { SqlEntityRepository, RequiredEntityData, EntityManager } from '@mikro-orm/postgresql'
import { InjectRepository } from '@mikro-orm/nestjs'
import { TemplateDto } from '../template.dto'

@Injectable()
export class CreateTemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: SqlEntityRepository<Template>,
    private readonly em: EntityManager,
  ) { }

  async createTemplate(templateData: RequiredEntityData<Template>): Promise<TemplateDto> {
    const entity = this.repository.create(templateData)

    await this.em.persistAndFlush(entity)

    return mapTemplateToDto(entity)
  }
}