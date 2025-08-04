'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Typography, Alert, Container, CircularProgress, Box } from '@mui/material'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  
  return (
    <Alert severity="error">
      <Typography variant="h6">Authentication Error</Typography>
      <Typography>Error: {error}</Typography>
      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        Check the browser console for more details.
      </Typography>
    </Alert>
  )
}

export default function ErrorPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      }>
        <ErrorContent />
      </Suspense>
    </Container>
  )
}
