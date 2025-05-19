import Image from 'next/image'
import { Typography, Box, Container, Skeleton } from '@mui/material'
import TemplateList from './components/TemplateList'
import { Suspense } from 'react'

export default async function Home({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { templateId } = await searchParams

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        {/*TODO: Remove or replace this with a proper logo*/}
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Typography variant='h1'>PDF Generator</Typography>
        <Suspense fallback={
          <Box sx={{ display: 'flex', gap: 6, p:4 }}>
            {Array.from({ length: 3 }).map((_, id) => (
              <Skeleton
                key={id}
                variant="rectangular"
                width={320}
                height={120}
                animation="wave"
              />
            ))}
          </Box>
        }>
          <TemplateList />
        </Suspense>
        {
          templateId && <Typography variant='h2'>TODO: Template component</Typography>
        }
      </Box>
    </Container>
  );
}
