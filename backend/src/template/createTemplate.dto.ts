import { OmitType } from '@nestjs/swagger'
import { TemplateDto } from './template.dto'

export class CreateTemplateDto extends OmitType(TemplateDto, ['id', 'variables'] as const) { }
