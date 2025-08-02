'use server'

import { Variable } from '@/types'
import { apiRequest } from '.'

export async function getVariables(templateId: string) {
  return apiRequest(`/api/v1/template/${templateId}/variable`, { method: 'GET' }, 'fetch variables')
}

export async function getVariable(templateId: string, variableId: string) {
  return apiRequest(
    `/api/v1/template/${templateId}/variable/${variableId}`,
    { method: 'GET' },
    'fetch variable',
  )
}

export async function createVariable(templateId: string, variableData: Omit<Variable, 'id'>): Promise<Variable> {
  return apiRequest(
    `/api/v1/template/${templateId}/variable`,
    {
      method: 'POST',
      body: JSON.stringify(variableData),
    },
    'create variable'
  )
}

export async function updateVariable(templateId: string, variableId: string, variableData: Omit<Variable, 'id'>): Promise<Variable> {
  return apiRequest(
    `/api/v1/template/${templateId}/variable/${variableId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(variableData),
    },
    'update variable'
  )
}

export async function deleteVariable(templateId: string, variableId: string) {
  return apiRequest(
    `/api/v1/template/${templateId}/variable/${variableId}`,
    { method: 'DELETE' },
    'delete variable'
  )
}
