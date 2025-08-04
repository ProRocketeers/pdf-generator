'use server'

import {
  Box,
  Typography,
  Button,
} from '@mui/material'
import {
  Add as AddIcon,
} from '@mui/icons-material'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getTemplates } from '@/actions/template'
import Link from 'next/link'
import TemplateList from '@/components/admin/templates/TemplateList'
import AdminPage from '@/components/admin/page/AdminPage'

export default async function AdminTemplatesPage() {
  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Templates', href: '/admin/templates' }
  ]

  let templates = []
  let error: string | null = null

  try {
    templates = await getTemplates()
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load templates'
  }

  return (
    <AdminPage
      breadcrumbs={
        <Breadcrumbs items={breadcrumbItems} />
      }
      header={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            📄 Template Administration
          </Typography>
          <Button
            component={Link}
            href={'/admin/templates/create'}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create Template
          </Button>
        </Box>
      }
      footer={
        <Typography variant="body2" color="text.secondary">
          Total templates: {templates.length}
        </Typography>
      }
    >
      <TemplateList
        initialTemplates={templates}
        initialError={error}
      />
    </AdminPage>
  )
}
