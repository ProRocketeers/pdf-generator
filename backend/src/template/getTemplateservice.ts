import { TemplateDto } from '@backend/template/template.dto';
import { Template } from '@backend/template/template.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class GetTemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly repository: EntityRepository<Template>,
  ) {}

  async getTemplateList(id: string): Promise<TemplateDto> {
    const entity = await this.repository.findOne(id, { populate: ['variables'] });

    if (!entity) {
      throw new HttpException(
        `Template with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      imageUrl: entity.imageUrl,
      templateType: entity.templateType,
      templateUrl: entity.templateUrl,
      variables: entity.variables.map((y) => ({
        id: y.id,
        name: y.name,
        title: y.title,
        type: y.type,
        default: y.default,
      })),
    };
  }
}
