import { Box, Container } from '@mui/material'
import React, { PropsWithChildren } from 'react'

type AdminPageProps = PropsWithChildren<{
  breadcrumbs?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}>

export default function AdminPage({ children, breadcrumbs, header, footer }: AdminPageProps) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        {breadcrumbs && (
          <Box sx={{ py: 1 }}>
            {breadcrumbs}
          </Box>
        )}

        {header && (
          <Box sx={{ py: 1 }}>
            {header}
          </Box>
        )}

        <Box component="main" sx={{ py: 3 }}>
          {children}
        </Box>

        {footer && (
          <Box sx={{ py: 1 }}>
            {footer}
          </Box>
        )}
      </Box>
    </Container>
  )
}
