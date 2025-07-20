import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material'
import { Template } from '@/types'

interface TemplatesTableProps {
  templates: Template[]
  onView: (template: Template) => void
  onEdit: (template: Template) => void
  onDelete: (template: Template) => void
}

export default function TemplatesTable({ 
  templates, 
  onView, 
  onEdit, 
  onDelete 
}: TemplatesTableProps) {
  const getTemplateTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'primary'
      case 'html':
        return 'secondary'
      case 'adoc':
        return 'success'
      default:
        return 'default'
    }
  }

  if (templates.length === 0) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Variables</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No templates found. Create your first template!
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Variables</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id} hover>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="medium">
                  {template.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    maxWidth: 300,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {template.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={template.templateType.toUpperCase()}
                  size="small"
                  color={getTemplateTypeColor(template.templateType)}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {template.variables?.length || 0} variable{(template.variables?.length || 0) !== 1 ? 's' : ''}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  title="View Details"
                  onClick={() => onView(template)}
                >
                  <ViewIcon />
                </IconButton>
                <IconButton
                  size="small"
                  title="Edit Template"
                  onClick={() => onEdit(template)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  title="Delete Template"
                  color="error"
                  onClick={() => onDelete(template)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}