import { GetTemplateService } from '@backend/template/service/getTemplate.service'
import { VariableDto } from '@backend/template/variable.dto'
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'
import { GetVariableListService } from '@backend/variable/service/getVariableList.service'
import { GetVariableService } from '@backend/variable/service/getVariable.service'
import { DeleteVariableService } from '@backend/variable/service/deleteVariable.service'
import { CreateVariableService } from '@backend/variable/service/createVariable.service'
import { CreateVariableDto } from '@backend/template/createVariable.dto'
import { UpdateVariableService } from '@backend/variable/service/updateVariable.service'

@Controller('api/v1/template/:templateId/variable')
export class VariableController {
  constructor(
    private readonly getTemplateService: GetTemplateService,
    private readonly getVariableListService: GetVariableListService,
    private readonly getVariableService: GetVariableService,
    private readonly deleteVariableService: DeleteVariableService,
    private readonly createVariableService: CreateVariableService,
    private readonly updateVariableService: UpdateVariableService,
  ) { }

  @Get()
  @ApiParam({
    name: 'templateId',
    description: 'Template ID',
    example: '3453a66c-f7a4-4879-9db2-9b33c35c7f99'
  })
  @ApiResponse({
    description: 'List of variables for template',
    type: [VariableDto],
  })
  async getList(@Param('templateId') templateId: string): Promise<VariableDto[]> {
    this.getTemplateService.getTemplate(templateId)

    return this.getVariableListService.getVariableListByTemplateId(templateId)
  }

  @Get(':id')
  @ApiParam({
    name: 'templateId',
    description: 'Template ID',
    example: '3453a66c-f7a4-4879-9db2-9b33c35c7f99'
  })
  @ApiParam({
    name: 'variableId',
    description: 'Variable ID',
    example: '8abbe583-6af4-4b78-8623-35826bc3eabe'
  })
  @ApiResponse({
    description: 'Variable for template',
    type: VariableDto,
  })
  async get(
    @Param('templateId') templateId: string,
    @Param('id') variableId: string,
  ): Promise<VariableDto> {
    await this.getTemplateService.getTemplate(templateId)

    const variable = await this.getVariableService.getVariable(variableId)

    return variable
  }


  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the variable to delete',
    type: String,
    example: '58467411-5729-488e-88cf-30bbf239fbe7',
  })
  @ApiParam({
    name: 'templateId',
    description: 'Template ID',
    example: '3453a66c-f7a4-4879-9db2-9b33c35c7f99'
  })
  @ApiResponse({
    description: 'Variable deleted successfully',
    status: 204,
  })
  async delete(
    @Param('templateId') templateId: string,
    @Param('id') variableId: string,
  ): Promise<void> {
    await this.getTemplateService.getTemplate(templateId)

    await this.deleteVariableService.deleteVariable(variableId)
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the variable to update',
    type: String,
    example: '58467411-5729-488e-88cf-30bbf239fbe7',
  })
  @ApiBody({
    description: 'Update variable data',
    type: CreateVariableDto,
  })
  @ApiParam({
    name: 'templateId',
    description: 'Template ID',
    example: '3453a66c-f7a4-4879-9db2-9b33c35c7f99'
  })
  @ApiResponse({
    description: 'The updated variable',
    type: VariableDto,
  })
  async patch(
    @Param('templateId') templateId: string,
    @Param('id') variableId: string,
    @Body() updateVariableDto: CreateVariableDto,
  ): Promise<VariableDto> {
    await this.getTemplateService.getTemplate(templateId)

    return this.updateVariableService.updateVariable(variableId, updateVariableDto)
  }

  @Post()
  @ApiParam({
    name: 'templateId',
    description: 'Template ID',
    example: '3453a66c-f7a4-4879-9db2-9b33c35c7f99'
  })
  async post(
    @Param('templateId') templateId: string,
    @Body() createVariableDto: CreateVariableDto,
  ): Promise<VariableDto> {
    await this.getTemplateService.getTemplate(templateId)

    return this.createVariableService.createVariable({
      ...createVariableDto,
      template: templateId,
    })
  }
}
