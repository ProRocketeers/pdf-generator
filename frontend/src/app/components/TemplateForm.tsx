import { Box } from '@mui/material'
import { getTemplate } from '@/app/actions/getTemplate'

export default async function TemplateForm({ templateId }: { templateId: string }) {
  const template = await getTemplate(templateId)

  return (
    <Box maxWidth="lg">
      { `TODO: Template Form ${JSON.stringify(template)}` }
    </Box>
  )
}
