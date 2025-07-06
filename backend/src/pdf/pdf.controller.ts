import { CreatePdfRequestDto } from '@backend/pdf/createPdfRequest.dto'
import { PdfService } from '@backend/pdf/service/pdf.service'
import { GetTemplateService } from '@backend/template/service/getTemplate.service'
import { Body, Controller, Post, StreamableFile } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'

@Controller('api/v1/pdf')
export class PdfController {
  constructor(
    private readonly getTemplateService: GetTemplateService,
    private readonly pdfApiService: PdfService,
  ) { }

  @Post()
  @ApiBody({
    description: 'Request to create a PDF from a template',
    type: CreatePdfRequestDto,
  })
  async createPdf(
    @Body() createPdfRequestDto: CreatePdfRequestDto,
  ): Promise<StreamableFile> {
    const { templateId, variables, fileName } = createPdfRequestDto

    const template = await this.getTemplateService.getTemplate(templateId)
    if (!template) {
      throw new Error(`Template with id ${templateId} not found`)
    }

    const { templateUrl, templateType } = template

    const pdfStream = await this.pdfApiService.generatePdf({
      templateType,
      templateUrl,
      variables,
    })

    // Dynamically set headers using the response object
    // Inject Response from @nestjs/common
    // You need to add @Res() res: Response as a parameter and return res.sendFile/stream
    // Example:
    // import { Response } from 'express';
    // and add @Res() res: Response

    // But with StreamableFile, you can set headers like this:
    const streamableFile = new StreamableFile(pdfStream, {
      type: 'application/pdf',
      disposition: `attachment; filename="${fileName || 'generated.pdf'}"`,
    })
    return streamableFile
  }
}
