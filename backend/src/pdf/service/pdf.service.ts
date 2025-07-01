import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { TemplateType } from '@backend/template/templateType.enum'
import { GeneratePdfRequestDto } from './generatePdfRequest.dto'
import { ConfigService } from '@nestjs/config'

interface GeneratePdfInput {
  templateUrl: string
  templateType: TemplateType
  variables: Record<string, any>
}

const API_VERSION = 'v1' as const

@Injectable()
export class PdfService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  private get baseUrl(): string {
    const apiUrl = this.configService.get<string>('PDF_SERVICE_API_URL')

    if (!apiUrl) {
      throw new HttpException(
        'API_URL is not configured',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }

    return `${apiUrl}/api/${API_VERSION}`
  }

  async generatePdf({templateUrl, templateType, variables}: GeneratePdfInput): Promise<Buffer> {
    try {
      const request: GeneratePdfRequestDto = {
        template: templateUrl,
        variables,
      }
      const url = `${this.baseUrl}/generate/${templateType}`

      const response = await firstValueFrom(
        this.httpService.post(url, request, {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        })
      )

      return Buffer.from(response.data)
    } catch (error) {
      throw new HttpException(
        `PDF generation failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
