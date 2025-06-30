import { getTemplate } from '@/app/actions/getTemplate'
import Template from "@/app/components/Template"
import { Box } from '@mui/material'

export default async function TemplateForm({ templateId }: { templateId: string }) {
  const template = await getTemplate(templateId)

  return (
    <Box>
      { template && <Template template={template} /> }
    </Box>
  )
}
