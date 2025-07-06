import { TemplateType } from '@backend/template/service/templateType.enum'
import { VariableDto } from '@backend/template/variable.dto'
import { ApiProperty } from '@nestjs/swagger'

export class TemplateDto {
  @ApiProperty({
    description: 'Unique identifier of the template',
    example: '3453a66c-f7a4-4879-9db2-9b33c35c7f99',
  })
  id: string

  @ApiProperty({
    description: 'Title of the template',
    example: 'Payment Receipt',
  })
  title: string

  @ApiProperty({
    description: 'Description of the template',
    example: 'Description of PDF Template',
  })
  description: string

  @ApiProperty({
    description: 'URL to the template file',
    example: 'https://drive.google.com/uc?export=download&id=16oauTQqVnJtJEl8unMYyUpH6BILRS97C',
  })
  templateUrl: string

  @ApiProperty({
    description: 'Type of the template',
    enum: TemplateType,
    example: TemplateType.Adoc,
  })
  templateType: TemplateType

  @ApiProperty({
    description: 'URL to the image representing the template',
    example: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png',
  })
  imageUrl: string

  @ApiProperty({
    description: 'Template variables',
    type: [VariableDto],
  })
  variables: VariableDto[]
}
