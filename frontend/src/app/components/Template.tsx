'use client'

import { Box, Typography, Button, Paper, Grid, TextField } from '@mui/material'
import { SubmitHandler, useForm } from "react-hook-form"
import { postVariables } from '@/app/actions/postVariables'
import { useState } from 'react'

export interface Variables {
  amount: string
  currency: string
  date: string
  name: string
  reference: string
}

export default function Template({ template }: any) {
  const fieldTypeMapper = new Map<string, string>([
    ['string', 'text'],
    ['number', 'number'],
    ['date', 'date']
  ])

  const {
    register,
    handleSubmit,
  } = useForm<any>()

  const [isLoading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<any> = async (variables: Variables) => {
    setLoading(true)

    await postVariables(template.id, variables).then((pdf: Blob) => {
      const url = URL.createObjectURL(pdf)
      const link = document.createElement('a')
      link.href = url
      link.download = `${template.title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })

    setLoading(false)
  }

  return (
    <Box my={4}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h4">
            {template.title}
          </Typography>
          <Typography variant="subtitle1">
            {template.description}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} mt={2}>
            {template.variables.map((variable: any, index: number) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <TextField
                  {...register(variable.name)}
                  label={variable.title}
                  name={variable.name}
                  type={fieldTypeMapper.get(variable.type) || 'text'}
                  defaultValue={variable.default}
                  fullWidth
                  slotProps={{inputLabel: variable.type === 'date' ? { shrink: true } : undefined}}
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button loading={isLoading} type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}
