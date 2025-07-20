import { getTemplate } from '@/actions/template'
import Template from "@/components/Template"
import { Box } from '@mui/material'

export default async function TemplateForm({ templateId }: { templateId: string }) {
  const template = await getTemplate(templateId)

  return (
    <Box>
      { template && <Template template={template} /> }
    </Box>
  )
}
