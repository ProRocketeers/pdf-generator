import { TemplateType } from '@backend/template/templateType.enum';
import { VariableDto } from '@backend/template/variable.dto';

export class TemplateDto {
  id: string;
  title: string;
  description: string;
  templateUrl: string;
  templateType: TemplateType;
  imageUrl: string;
  variables: VariableDto[];
}
