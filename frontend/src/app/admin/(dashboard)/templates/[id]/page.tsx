'use server'

import {
  Typography,
  Paper,
} from '@mui/material'
import { getTemplate } from '@/actions/template'
import Breadcrumbs from '@/components/Breadcrumbs'
import { notFound } from 'next/navigation'
import TemplateDetail from '@/components/admin/templates/TemplateDetail'
import { Template } from '@/types'
import AdminPage from '@/components/admin/page/AdminPage'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { id } = await params

  let template: Template | undefined
  let error: string | undefined

  try {
    template = await getTemplate(id)
  } catch (err) {
    if (err instanceof Error && err.message.includes('404')) {
      notFound()
    }
    error = err instanceof Error ? err.message : 'Failed to load template'
  }

  const breadcrumbItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Templates', href: '/admin/templates' },
    { label: template?.title || 'Template' }
  ]

  return (

    <AdminPage
      breadcrumbs={
        <Breadcrumbs items={breadcrumbItems} />
      }
      header={
        <>
          <Typography variant="h4" component="h1">
            ✏️ {template?.title || 'Template'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Real-time editing • Changes are saved automatically
          </Typography>
        </>
      }
    >
      <Paper elevation={1} sx={{ p: 3 }}>
        <TemplateDetail
          templateId={id}
          initialTemplate={template}
          initialError={error}
        />
      </Paper>
    </AdminPage>
  )
}