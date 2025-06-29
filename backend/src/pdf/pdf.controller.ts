import { GetTemplateListService } from '@backend/template/getTemplateList.service'
import { Body, Controller, Post, StreamableFile } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { CreatePdfRequestDto } from './createPdfRequest.dto'
import { PdfService } from './service/pdf.service'

@Controller('api/v1/pdf')
export class PdfController {
  constructor(
    private readonly getTemplateListService: GetTemplateListService,
    private readonly pdfApiService: PdfService
  ) {}

  @Post()
  @ApiBody({ type: CreatePdfRequestDto })
  async createPdf(
    @Body() createPdfRequestDto: CreatePdfRequestDto
  ): Promise<StreamableFile> {
    const { templateId, variables, fileName } = createPdfRequestDto
    // TODO: Switch to  getTemplateById if implemented
    const template = (await this.getTemplateListService.getTemplateList()).find(
      (t) => t.id === templateId
    )

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