import { GetTemplateListService } from '@backend/template/getTemplateList.service';
import { TemplateDto } from '@backend/template/template.dto';
import { Controller, Get } from '@nestjs/common';

@Controller('template')
export class TemplateController {
  constructor(private readonly getTemplateListService: GetTemplateListService) {}

  @Get()
  async getList(): Promise<TemplateDto[]> {
    return this.getTemplateListService.getTemplateList();
  }
}
