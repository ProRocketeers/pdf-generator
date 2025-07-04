'use server'

import type { Variables} from '@/app/components/Template'

const API_URL = process.env.API_URL as string

export async function postVariables(templateId: string, variables: Variables) {
  const body = {
    templateId,
    variables
  }

  return fetch(`${API_URL}/api/v1/pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.blob()).catch(err => {
    throw new Error(`Failed to create PDF: ${err.statusText}`)
  })
}
