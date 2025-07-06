import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { mapTemplateToDto, Template } from './template.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, SqlEntityRepository } from '@mikro-orm/postgresql'
import { TemplateDto } from '../template.dto'

type UpdateTemplateData = Partial<Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'variables'>>

@Injectable()
export class UpdateTemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: SqlEntityRepository<Template>,
    private readonly em: EntityManager,
  ) { }

  async updateTemplate(id: string, templateData: UpdateTemplateData): Promise<TemplateDto> {
    const entity = await this.templateRepository.findOne(id, {
      populate: ['variables']
    })

    if (!entity) {
      throw new HttpException(
        `Template with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      )
    }

    this.em.assign(entity, templateData);

    await this.em.persistAndFlush(entity)

    return mapTemplateToDto(entity)
  }
}