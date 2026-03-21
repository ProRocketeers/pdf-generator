import { Typography, Box, Container } from '@mui/material'
import TemplateList from '@/components/TemplateList'
import { Suspense } from 'react'
import TemplateForm from '@/components/TemplateForm'
import TemplateListSkeleton from '../../components/TemplateListSkeleton'

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { templateId } = await searchParams

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f9ff', py: 5 }}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          mb={2}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #051641 0%, #0a3d7a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
            }}
          >
            📄
          </Box>
          <Box textAlign="center">
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 700, 
                color: '#1f2937',
                mb: 1 
              }}
            >
              PDF Generator
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6b7280',
                fontSize: '1rem'
              }}
            >
              Vyberte šablonu a generujte PDF dokumenty ze svých dat
            </Typography>
          </Box>
        </Box>

        <Suspense fallback={<TemplateListSkeleton />}>
          <TemplateList />
        </Suspense>

        {templateId && <TemplateForm templateId={templateId as string} />}
      </Container>
    </Box>
  )
}
