export async function getTemplate(templateId: string) {
  // TODO: Not implemented yet
  // const response = await fetch(`/api/v1/template/${templateId}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })

  // if (!response.ok) {
  //   throw new Error(`Failed to fetch template: ${response.statusText}`)
  // }

  // return response.json()

  // TODO: Replace this with a proper API call to fetch templates
  await new Promise(resolve => setTimeout(resolve, 3000))

  return { id: templateId, name: `Proper name for templateId: ${templateId}` }
}
