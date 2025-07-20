'use server'

import { apiRequest } from '.'

export async function generatePdf(templateId: string, variables: Record<string, string>) {
  return apiRequest(
    '/api/v1/pdf',
    { 
      method: 'POST',
      body: JSON.stringify({ templateId, variables }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    'generate PDF'
  )
}
