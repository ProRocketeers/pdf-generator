'use server'

const API_URL = process.env.API_URL as string

export async function postVariables(templateId: string, formData: FormData) {
  const body = {
    templateId,
    variables: Object.fromEntries(formData.entries())
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
