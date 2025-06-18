import { EntityBase } from '@backend/common/database/base.entity';
import { TemplateType } from '@backend/template/templateType.enum';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class Template extends EntityBase {
  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  templateUrl: string;

  @Property()
  templateType: TemplateType;

  @Property()
  imageUrl: string;
}
