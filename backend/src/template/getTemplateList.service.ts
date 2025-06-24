import { TemplateDto } from '@backend/template/template.dto';
import { Template } from '@backend/template/template.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetTemplateListService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: EntityRepository<Template>,
  ) {}

  async getTemplateList(): Promise<TemplateDto[]> {
    const entities = await this.repository.find({}, { populate: ['variables'] });

    return entities.map((x) => ({
      id: x.id,
      title: x.title,
      description: x.description,
      imageUrl: x.imageUrl,
      templateType: x.templateType,
      templateUrl: x.templateUrl,
      variables: x.variables.map((y) => ({
        id: y.id,
        name: y.name,
        title: y.title,
        type: y.type,
        default: y.default,
      })),
    }));
  }
}
