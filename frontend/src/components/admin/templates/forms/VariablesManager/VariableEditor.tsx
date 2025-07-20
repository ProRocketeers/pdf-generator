'use client'

import {
  Box,
  TextField,
  Typography,
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Variable } from '@/types'

interface VariableEditorProps {
  variable?: Omit<Variable, 'id'>
  onChange?: (variable: Omit<Variable, 'id'>) => void
  title?: string
  readOnly?: boolean
  actions?: React.ReactNode // Pro tlačítka z rodičovské komponenty
}

export default function VariableEditor({
  variable: inputVariable,
  onChange,
  title,
  readOnly = false,
  actions
}: VariableEditorProps) {
  const variableTypes = [
    { value: 'string', label: 'Text (String)' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'boolean', label: 'Boolean (Yes/No)' },
    { value: 'email', label: 'Email' },
    { value: 'url', label: 'URL' },
  ] as const

  const defaultVariable: Omit<Variable, 'id'> = {
    title: '',
    name: '',
    default: undefined,
    type: 'string' as const,
  }

  const currentVariable = { ...defaultVariable, ...inputVariable }

  // Function to generate variable name from title with diacritics handling
  const generateVariableName = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      // Normalize to decomposed form and remove combining characters (diacritics)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Remove special characters except spaces and dashes
      .replace(/[^a-z0-9\s-]/g, '')
      // Replace spaces with dashes
      .replace(/\s+/g, '-')
      // Replace multiple dashes with single dash
      .replace(/-+/g, '-')
      // Remove leading/trailing dashes
      .replace(/^-|-$/g, '')
  }

  const handleFieldChange = (field: string, value: any) => {
    const updatedVariable = {
      ...currentVariable,
      [field]: value,
      ...(field === 'title' && { name: generateVariableName(value) })
    }
    
    if (onChange) {
      onChange(updatedVariable)
    }
  }

  const getTypePlaceholder = (type: string) => {
    switch (type) {
      case 'string': return 'Default text value'
      case 'number': return '0'
      case 'date': return 'YYYY-MM-DD'
      case 'boolean': return 'true'
      case 'email': return 'user@example.com'
      case 'url': return 'https://example.com'
      default: return 'Default value'
    }
  }

  return (
    <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
      {title && (
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      
      <Grid container spacing={2} alignItems="center">
        {/* Display Title */}
        <Grid size={{ xs: 12, sm: 3.5 }}>
          <TextField
            fullWidth
            size="small"
            label="Display Title"
            value={currentVariable.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g., Jméno zákazníka"
            helperText="Title shown to users"
            disabled={readOnly}
          />
        </Grid>

        {/* Type */}
        <Grid size={{ xs: 12, sm: 2.5 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={currentVariable.type}
              onChange={(e) => handleFieldChange('type', e.target.value)}
              label="Type"
              disabled={readOnly}
            >
              {variableTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Default Value */}
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            size="small"
            label="Default Value"
            value={currentVariable.default || ''}
            onChange={(e) => handleFieldChange('default', e.target.value)}
            placeholder={getTypePlaceholder(currentVariable.type)}
            type={currentVariable.type === 'number' ? 'number' : 'text'}
            disabled={readOnly}
          />
        </Grid>

        {/* Actions */}
        <Grid size={{ xs: 12, sm: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
            {actions}
          </Box>
        </Grid>
      </Grid>

      {/* Preview of variable name */}
      {currentVariable.title && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="caption" color="text.secondary">
            Variable: <code style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              padding: '2px 4px', 
              borderRadius: '3px',
              fontWeight: 'bold'
            }}>
              {`{${generateVariableName(currentVariable.title)}}`}
            </code>
          </Typography>
        </Box>
      )}
    </Card>
  )
}