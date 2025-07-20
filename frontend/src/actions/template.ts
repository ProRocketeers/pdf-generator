'use server'

import { Template } from '@/types'
import { apiRequest } from '.'

export async function getTemplates() {
  return apiRequest('/api/v1/template', { method: 'GET' }, 'fetch templates')
}

export async function getTemplate(templateId: string) {
  return apiRequest(
    `/api/v1/template/${templateId}`,
    { method: 'GET' },
    'fetch template'
  )
}

export async function createTemplate(templateData: Omit<Template, 'id'>): Promise<Template> {
  console.log('Creating template with data:', templateData)
  return apiRequest(
    '/api/v1/template',
    {
      method: 'POST',
      body: JSON.stringify(templateData),
    },
    'create template'
  )
}

export async function updateTemplate(templateId: string, templateData: Omit<Template, 'id'>): Promise<Template> {
  console.log('Updating template:', { templateId, templateData })
  return apiRequest(
    `/api/v1/template/${templateId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(templateData),
    },
    'update template'
  )
}

export async function deleteTemplate(templateId: string) {
  return apiRequest(
    `/api/v1/template/${templateId}`,
    { method: 'DELETE' },
    'delete template'
  )
}
