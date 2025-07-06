import { GeneratePdfRequestDto } from '@backend/pdf/service/generatePdfRequest.dto';
import { TemplateType } from '@backend/template/service/templateType.enum';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface GeneratePdfInput {
  templateUrl: string;
  templateType: TemplateType;
  variables: Record<string, any>;
}

const API_VERSION = 'v1' as const;

@Injectable()
export class PdfService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async generatePdf({
    templateUrl,
    templateType,
    variables,
  }: GeneratePdfInput): Promise<Buffer> {
    try {
      const request: GeneratePdfRequestDto = {
        template: templateUrl,
        variables,
      };
      const url = `${this.baseUrl}/generate/${templateType}`;

      const response = await firstValueFrom(
        this.httpService.post(url, request, {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }),
      );

      return Buffer.from(response.data);
    } catch (error) {
      throw new HttpException(
        `PDF generation failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private get baseUrl(): string {
    const apiUrl = this.configService.get<string>('PDF_SERVICE_API_URL');

    if (!apiUrl) {
      throw new HttpException(
        'API_URL is not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return `${apiUrl}/api/${API_VERSION}`;
  }
}
