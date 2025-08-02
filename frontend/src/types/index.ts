export interface Template {
  id: string
  title?: string
  description?: string
  templateType?: TemplateType
  templateUrl?: string
  imageUrl?: string
  variables?: Variable[]
}

export interface Variable {
  id: string
  name: string
  title: string
  type: string
  default?: string
}

export interface DeleteDialogState<T> {
  open: boolean
  entity: T | null
}

export type TemplateType = 'adoc' | 'html' | 'pdf'

export type TemplateFormData = Omit<Template, 'id' | 'variables'>

export type VariableFormData = Omit<Variable, 'id'>