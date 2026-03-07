'use client'

import { Box, Typography, Button, Paper, Grid, TextField, Stack, Divider } from '@mui/material'
import { SubmitHandler, useForm } from "react-hook-form"
import { generatePdf } from '@/actions/pdf'
import { useState } from 'react'
import { Template as TemplateType } from '@/types'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

export interface TemplateProps {
  template: TemplateType
}

export default function Template({ template }: TemplateProps) {
  const fieldTypeMapper = new Map<string, string>([
    ['string', 'text'],
    ['number', 'number'],
    ['date', 'date']
  ])

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<any>()

  const [isLoading, setLoading] = useState(false)
  const formValues = watch()

  const onSubmit: SubmitHandler<Record<string, string>> = async (variables) => {
    setLoading(true)

    await generatePdf(template.id, variables).then((pdf: Blob) => {
      const url = URL.createObjectURL(pdf)
      const link = document.createElement('a')
      link.href = url
      link.download = `${template.title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setLoading(false)
    })
  }

  const handleReset = () => {
    reset()
  }

  const getFormDataJson = () => {
    const data = Object.entries(formValues).reduce((acc: any, [key, value]) => {
      if (value) acc[key] = value
      return acc
    }, {})
    return JSON.stringify(data, null, 2)
  }

  return (
    <Box>
      <Paper elevation={0} sx={{ padding: 4, backgroundColor: '#ffffff' }}>
        <Box display="flex" flexDirection="column" gap={1} mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #051641 0%, #0a3d7a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
              }}
            >
              📄
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {template.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                {template.description}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                {(template.variables || []).map((variable: any) => (
                  <TextField
                    key={variable.name}
                    {...register(variable.name)}
                    label={variable.title}
                    name={variable.name}
                    type={fieldTypeMapper.get(variable.type) || 'text'}
                    defaultValue={variable.default}
                    fullWidth
                    slotProps={{
                      inputLabel: variable.type === 'date' ? { shrink: true } : undefined
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      }
                    }}
                  />
                ))}

                <Stack direction="row" spacing={2} mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    startIcon={<FileDownloadIcon />}
                    fullWidth
                  >
                    {isLoading ? 'Generování...' : 'Generovat PDF'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    onClick={handleReset}
                    startIcon={<RestartAltIcon />}
                    sx={{
                      borderRadius: '8px',
                    }}
                  >
                    Resetovat
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Grid>

          {/* Preview Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: 2,
                border: '1px solid #e2e8f0',
                height: '100%',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                Odeslаný obsah
              </Typography>
              <Box
                component="pre"
                sx={{
                  backgroundColor: '#ffffff',
                  padding: 2,
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                  color: '#374151',
                  border: '1px solid #e5e7eb',
                  maxHeight: '400px',
                }}
              >
                {getFormDataJson()}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

