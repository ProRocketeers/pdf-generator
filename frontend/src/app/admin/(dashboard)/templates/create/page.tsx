'use client'

import {
  Container,
  Typography,
  Paper,
} from '@mui/material'
import Breadcrumbs from '@/components/Breadcrumbs'
import TemplateDetail from '@/components/admin/templates/TemplateDetail'

export default function CreateTemplatePage() {

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Templates', href: '/admin/templates' },
    { label: 'Create Template' },
  ]

  return (
    <Container maxWidth="lg">
      <Breadcrumbs items={breadcrumbItems} sx={{ mb: 3 }} />

      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Create New Template
      </Typography>

      <Paper elevation={1} sx={{ p: 3 }}>
        <TemplateDetail />
      </Paper>
    </Container>
  )
}