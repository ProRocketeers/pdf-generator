const API_URL = process.env.API_URL as string

export async function getTemplates() {
  const response = await fetch(`${API_URL}/api/v1/template`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.statusText}`)
  }

  return response.json()
}
