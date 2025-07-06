import { ApiProperty } from '@nestjs/swagger'
import { VariableType } from './service/variableType.enum'

export class VariableDto {
  @ApiProperty({
    description: 'Variable ID',
    example: '8abbe583-6af4-4b78-8623-35826bc3eabe'
  })
  id: string

  @ApiProperty({
    description: 'Variable name',
    example: 'amount'
  })
  name: string

  @ApiProperty({
    description: 'Variable type',
    enum: VariableType,
    example: VariableType.String
  })
  type: VariableType

  @ApiProperty({
    description: 'Variable title',
    example: 'Amount'
  })
  title: string

  @ApiProperty({
    description: 'Default value',
    example: '104.00'
  })
  default: string | null
}
