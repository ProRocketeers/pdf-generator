import { EntityBase } from '@backend/common/database/base.entity';
import { Template } from '@backend/template/template.entity';
import { VariableType } from '@backend/template/variableType.enum';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';

@Entity()
export class Variable extends EntityBase {
  @Property()
  name: string;

  @Enum(() => VariableType)
  type: VariableType = VariableType.String;

  @Property()
  title: string;

  @Property({ nullable: true })
  default: string | null;

  @ManyToOne(() => Template)
  template: Template;
}
