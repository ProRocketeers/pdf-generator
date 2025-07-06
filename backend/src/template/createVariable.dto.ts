import { OmitType } from '@nestjs/swagger'
import { VariableDto } from './variable.dto'

export class CreateVariableDto extends OmitType(VariableDto, ['id'] as const) { }
