export class CreatePdfRequestDto {
  templateId: string;
  variables: Record<string, any>;
  fileName?: string;
}
