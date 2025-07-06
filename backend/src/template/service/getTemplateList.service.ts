import { TemplateDto } from '@backend/template/template.dto'
import { mapTemplateToDto, Template } from '@backend/template/service/template.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GetTemplateListService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: EntityRepository<Template>,
  ) { }

  async getTemplateList(): Promise<TemplateDto[]> {
    const entities = await this.repository.find({}, { populate: ['variables'] })

    return entities.map(mapTemplateToDto)
  }
}
