import { GetTemplateListService } from '@backend/template/service/getTemplateList.service'
import { GetTemplateService } from '@backend/template/service/getTemplate.service'
import { TemplateDto } from '@backend/template/template.dto'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { CreateTemplateService } from '@backend/template/service/createTemplate.service'
import { CreateTemplateDto } from '@backend/template/createTemplate.dto'
import { DeleteTemplateService } from '@backend/template/service/deleteTemplate.service'
import { UpdateTemplateService } from '@backend/template/service/updateTemplate.service'

@Controller('api/v1/template')
export class TemplateController {
  constructor(
    private readonly getTemplateListService: GetTemplateListService,
    private readonly getTemplateService: GetTemplateService,
    private readonly createTemplateService: CreateTemplateService,
    private readonly deleteTemplateService: DeleteTemplateService,
    private readonly updateTemplateService: UpdateTemplateService,
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

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the template to delete',
    type: String,
    example: '58467411-5729-488e-88cf-30bbf239fbe7',
  })
  @ApiResponse({
    description: 'Template deleted successfully',
    status: 204,
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteTemplateService.deleteTemplate(id)
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the template to update',
    type: String,
    example: '58467411-5729-488e-88cf-30bbf239fbe7',
  })
  @ApiBody({
    description: 'Update template data',
    type: CreateTemplateDto,
  })
  @ApiResponse({
    description: 'The updated template',
    type: TemplateDto,
  })
  async patch(
    @Param('id') id: string,
    @Body() updateTemplateDto: CreateTemplateDto,
  ): Promise<TemplateDto> {
    return this.updateTemplateService.updateTemplate(id, updateTemplateDto)
  }

  @Post()
  @ApiBody({
    description: 'Create a new template',
    type: CreateTemplateDto,
  })
  async post(
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<TemplateDto> {
    return this.createTemplateService.createTemplate({
      ...createTemplateDto,
      variables: [],
    })
  }
}
