import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import { Template } from '@/types'

interface DeleteTemplateDialogProps {
  open: boolean
  template: Template | null
  onClose: () => void
  onConfirm: (template: Template) => void
  loading?: boolean
}

export default function DeleteTemplateDialog({
  open,
  template,
  onClose,
  onConfirm,
  loading = false
}: DeleteTemplateDialogProps) {
  const handleConfirm = () => {
    if (template) {
      onConfirm(template)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Template</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete template "{template?.title}"?
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}