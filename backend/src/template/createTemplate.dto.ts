import { TemplateType } from '@backend/template/service/templateType.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateTemplateDto {
	@ApiProperty({
		description: 'Title of the template',
		example: 'Payment Receipt',
	})
	@IsString()
	@IsNotEmpty()
	title: string

	@ApiProperty({
		description: 'Description of the template',
		example: 'Description of PDF Template',
	})
	@IsString()
	@IsNotEmpty()
	description: string

	@ApiProperty({
		description: 'URL to the template file',
		example: 'https://drive.google.com/uc?export=download&id=16oauTQqVnJtJEl8unMYyUpH6BILRS97C',
	})
	@IsString()
	@IsNotEmpty()
	templateUrl: string

	@ApiProperty({
		description: 'Type of the template',
		enum: TemplateType,
		example: TemplateType.Adoc,
	})
	@IsEnum(TemplateType)
	templateType: TemplateType

	@ApiProperty({
		description: 'URL to the image representing the template',
		example: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png',
	})
	@IsString()
	@IsNotEmpty()
	imageUrl: string
}
