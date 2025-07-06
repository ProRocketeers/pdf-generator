import { TemplateDto } from '@backend/template/template.dto'
import { mapTemplateToDto, Template } from '@backend/template/service/template.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository, t } from '@mikro-orm/postgresql'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class GetTemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: EntityRepository<Template>,
  ) { }

  async getTemplate(id: string): Promise<TemplateDto> {
    const entity = await this.repository.findOne(id, { populate: ['variables'] })

    if (!entity) {
      throw new HttpException(
        `Template with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      )
    }

    return mapTemplateToDto(entity)
  }
}
