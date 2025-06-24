import { EntityBase } from '@backend/common/database/base.entity';
import { TemplateType } from '@backend/template/templateType.enum';
import { Variable } from '@backend/template/variable.entity';
import { Entity, Enum, OneToMany, Property } from '@mikro-orm/core';

@Entity()
export class Template extends EntityBase {
  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  templateUrl: string;

  @Enum(() => TemplateType)
  templateType: TemplateType;

  @Property()
  imageUrl: string;

  @OneToMany({
    entity: () => Variable,
    mappedBy: 'template',
    orphanRemoval: true,
  })
  variables: Variable[];
}
