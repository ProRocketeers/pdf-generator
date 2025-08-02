'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Grid,
} from '@mui/material'
import { Template } from '@/types'

interface TemplateFormProps {
  template?: Omit<Template, 'id' | 'variables'>
  onChange: (template: Omit<Template, 'id' | 'variables'>) => void
}

export default function TemplateForm({
  template,
  onChange,
}: TemplateFormProps) {
  const [formData, setFormData] = useState({
    title: template?.title || '',
    description: template?.description || '',
    templateType: template?.templateType || 'adoc',
    templateUrl: template?.templateUrl || '',
    imageUrl: template?.imageUrl || '',
  })

  const [isInitialRender, setIsInitialRender] = useState(true)

  const templateTypes = [
    { value: 'adoc', label: 'AsciiDoc (.adoc)' },
    { value: 'html', label: 'HTML (.html)' },
    { value: 'pdf', label: 'PDF Form (.pdf)' },
  ] as const

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    onChange(formData)
  }, [formData, onChange])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📋 Template Configuration
          </Typography>
          <Divider sx={{ mb: 3 }} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            label="Template Title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., Invoice Template"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Template Type</InputLabel>
            <Select
              value={formData.templateType}
              onChange={(e) => handleInputChange('templateType', e.target.value)}
              label="Template Type"
            >
              {templateTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe what this template is used for..."
          />
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Template URL"
            value={formData.templateUrl}
            onChange={(e) => handleInputChange('templateUrl', e.target.value)}
            placeholder="e.g., /templates/invoice.adoc"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Preview Image URL (Optional)"
            value={formData.imageUrl}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            placeholder="e.g., /images/template-preview.png"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
