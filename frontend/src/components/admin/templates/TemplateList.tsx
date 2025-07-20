'use client'

import { useState } from 'react'
import { Alert } from '@mui/material'
import { Template, DeleteDialogState } from '@/types'
import { deleteTemplate } from '@/actions/template'
import TemplatesTable from '@/components/admin/templates/tables/TemplatesTable'
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog'
import { useRouter } from 'next/navigation'

interface TemplateListProps {
  initialTemplates: Template[]
  initialError: string | null
}

export default function TemplateList({
  initialTemplates,
  initialError
}: TemplateListProps) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates)
  const [error, setError] = useState<string | null>(initialError)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState<Template>>({
    open: false,
    entity: null
  })
  const router = useRouter()

  const handleView = (template: Template) => {
    router.push(`/admin/templates/${template.id}`)
  }

  const handleEdit = (template: Template) => {
    router.push(`/admin/templates/${template.id}`)
  }

  const handleDelete = async (template: Template) => {
    try {
      setIsDeleting(true)
      setError(null)
      await deleteTemplate(template.id)
      setTemplates(prev => prev.filter(t => t.id !== template.id))
      setDeleteDialog({ open: false, entity: null })
    } catch (err) {
      console.error('Failed to delete template:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete template')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteClick = (template: Template) => {
    setDeleteDialog({ open: true, entity: template })
  }

  return (
    <>
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Templates Table */}
      <TemplatesTable
        templates={templates}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        message={`Are you sure you want to delete template "${deleteDialog.entity?.title}"? This action cannot be undone.`}
        onClose={() => setDeleteDialog({ open: false, entity: null })}
        onConfirm={() => deleteDialog.entity && handleDelete(deleteDialog.entity)}
        loading={isDeleting}
      />
    </>
  )
}