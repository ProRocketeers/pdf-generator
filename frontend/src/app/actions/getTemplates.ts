export async function getTemplates() {
  // TODO: Replace this with a proper API call to fetch templates
  await new Promise(resolve => setTimeout(resolve, 3000))

  return [
    { id: 123, name: 'Invoice Template' },
    { id: 234, name: 'Resume Template' },
    { id: 345, name: 'Report Template' },
    { id: 446, name: 'Newsletter Template' },
    { id: 567, name: 'Portfolio Template' },
  ]
}
