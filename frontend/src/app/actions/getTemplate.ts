export async function getTemplate(templateId: string) {
  // TODO: Replace this with a proper API call to fetch templates
  await new Promise(resolve => setTimeout(resolve, 3000))

  return { id: templateId, name: `Proper name for templateId: ${templateId}` }
}
