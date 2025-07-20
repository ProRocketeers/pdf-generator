import { Box } from '@mui/material'
import { getTemplates } from '@/actions/template'
import TemplateSwiper from '@/components/TemplateSwiper'

export default async function TemplateList() {
  const templates = await getTemplates()

  return (
    <Box maxWidth="lg">
      <TemplateSwiper templates={templates} />
    </Box>
  )
}
