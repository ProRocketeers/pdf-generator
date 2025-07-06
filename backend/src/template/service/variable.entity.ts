import { EntityBase } from '@backend/common/database/base.entity'
import { Template } from '@backend/template/service/template.entity'
import { VariableType } from '@backend/template/service/variableType.enum'
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { VariableDto } from '../variable.dto'

@Entity()
export class Variable extends EntityBase {
  @Property()
  name: string

  @Enum(() => VariableType)
  type: VariableType = VariableType.String;

  @Property()
  title: string

  @Property({ nullable: true })
  default: string | null

  @ManyToOne(() => Template)
  template: Template
}

export const mapVariableToDto = (variable: Variable): VariableDto => {
  const { createdAt, updatedAt, template, ...rest } = variable

  return rest
}
