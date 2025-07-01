const API_URL = process.env.API_URL as string

export async function getTemplate(templateId: string) {
  const response = await fetch(`${API_URL}/api/v1/template/${templateId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch template: ${response.statusText}`)
  }

  return response.json()
}
