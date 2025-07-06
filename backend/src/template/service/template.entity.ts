import { EntityBase } from '@backend/common/database/base.entity'
import { TemplateType } from '@backend/template/service/templateType.enum'
import { mapVariableToDto, Variable } from '@backend/template/service/variable.entity'
import { Entity, Enum, OneToMany, Property } from '@mikro-orm/core'
import { TemplateDto } from '../template.dto'

@Entity()
export class Template extends EntityBase {
  @Property()
  title: string

  @Property()
  description: string

  @Property()
  templateUrl: string

  @Enum(() => TemplateType)
  templateType: TemplateType

  @Property()
  imageUrl: string

  @OneToMany({
    entity: () => Variable,
    mappedBy: 'template',
    orphanRemoval: true,
  })
  variables: Variable[]
}

export const mapTemplateToDto = (entity: Template): TemplateDto => {
  const { createdAt, updatedAt, variables, ...rest } = entity

  return {
    ...rest,
    variables: variables.map(mapVariableToDto)
  }
}