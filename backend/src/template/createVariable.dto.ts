import { VariableType } from '@backend/template/service/variableType.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateVariableDto {
	@ApiProperty({
		description: 'Variable name',
		example: 'amount',
	})
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		description: 'Variable type',
		enum: VariableType,
		example: VariableType.String,
	})
	@IsEnum(VariableType)
	type: VariableType

	@ApiProperty({
		description: 'Variable title',
		example: 'Amount',
	})
	@IsString()
	@IsNotEmpty()
	title: string

	@ApiProperty({
		description: 'Default value',
		example: '104.00',
		nullable: true,
		required: false,
	})
	@IsOptional()
	@IsString()
	default?: string | null
}
