import { GetTemplateListService } from '@backend/template/getTemplateList.service';
import { GetTemplateService } from '@backend/template/getTemplateService';
import { TemplateDto } from '@backend/template/template.dto';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/v1/template')
export class TemplateController {
  constructor(
    private readonly getTemplateListService: GetTemplateListService,
    private readonly getTemplateService: GetTemplateService,
  ) {}

  @Get()
  async getList(): Promise<TemplateDto[]> {
    return this.getTemplateListService.getTemplateList();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<TemplateDto> {
    return this.getTemplateService.getTemplate(id);
  }
}
