import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreatePdfRequestDto {
  @ApiProperty({
    description: 'ID of the template to use for PDF generation',
    example: '58467411-5729-488e-88cf-30bbf239fbe7',
  })
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({
    description: 'Variables to replace in the template',
    example: {
      amount: '100.00',
      currency: 'EUR',
      date: '2025-05-04',
      name: 'Ondra Doe',
      reference: 'ABC123',
    },
  })
  @IsObject()
  variables: Record<string, any>;

  @ApiProperty({
    description: 'Optional file name for the generated PDF',
    example: 'invoice.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  fileName?: string;
}
