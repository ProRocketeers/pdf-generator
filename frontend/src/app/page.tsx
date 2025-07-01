import Image from 'next/image'
import { Typography, Box } from '@mui/material'
import TemplateList from './components/TemplateList'
import { Suspense } from 'react'
import TemplateForm from './components/TemplateForm'
import TemplateListSkeleton from './components/TemplateListSkeleton'
import { version } from '../../package.json'

export default async function Home({searchParams}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  const { templateId } = await searchParams

  return (
    <Box maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        {/*TODO: Remove or replace this with a proper logo*/}
        <Image
          src={`${basePath}/next.svg`}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Typography variant='h1'>PDF Generator</Typography>
        <Suspense fallback={
          <TemplateListSkeleton/>
        }>
          <TemplateList />
        </Suspense>
        {
          templateId && <TemplateForm templateId={templateId as string}/>
        }
      </Box>
      {version}
    </Box>
  );
}
