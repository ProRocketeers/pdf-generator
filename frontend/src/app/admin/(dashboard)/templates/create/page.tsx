'use client'

import {
  Typography,
  Paper,
} from '@mui/material'
import Breadcrumbs from '@/components/Breadcrumbs'
import TemplateDetail from '@/components/admin/templates/TemplateDetail'
import AdminPage from '@/components/admin/page/AdminPage'

export default function CreateTemplatePage() {

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Templates', href: '/admin/templates' },
    { label: 'Create Template' },
  ]

  return (
    <AdminPage
      breadcrumbs={
        <Breadcrumbs items={breadcrumbItems} />
      }
      header={
        <Typography variant="h4" component="h1">
          Create New Template
        </Typography>
      }
    >
      <Paper elevation={1} sx={{ p: 3 }}>
        <TemplateDetail />
      </Paper>
    </AdminPage>
  )
}