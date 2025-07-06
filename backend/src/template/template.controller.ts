import { GetTemplateListService } from '@backend/template/service/getTemplateList.service'
import { GetTemplateService } from '@backend/template/service/getTemplate.service'
import { TemplateDto } from '@backend/template/template.dto'
import { Controller, Get, Param } from '@nestjs/common'
import { ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('api/v1/template')
export class TemplateController {
  constructor(
    private readonly getTemplateListService: GetTemplateListService,
    private readonly getTemplateService: GetTemplateService,
  ) { }

  @Get()
  @ApiResponse({
    description: 'List of templates',
    type: [TemplateDto],
  })
  async getList(): Promise<TemplateDto[]> {
    return this.getTemplateListService.getTemplateList()
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the template to retrieve',
    type: String,
    example: '58467411-5729-488e-88cf-30bbf239fbe7',
  })
  @ApiResponse({
    description: 'The template',
    type: TemplateDto,
  })
  async get(@Param('id') id: string): Promise<TemplateDto> {
    return this.getTemplateService.getTemplate(id)
  }
}
