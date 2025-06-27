import { Box } from '@mui/material'
import { getTemplates } from '@/app/actions/getTemplates'
import TemplateSwiper from '@/app/components/TemplateSwiper'

export default async function TemplateList() {
  const templates = await getTemplates()

  return (
    <Box maxWidth="lg">
      <TemplateSwiper templates={templates} />
    </Box>
  )
}
