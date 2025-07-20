import { Box, Skeleton } from '@mui/material'

export default async function TemplateListSkeleton() {
  return (
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
  )
}
