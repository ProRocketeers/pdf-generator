import type { Metadata } from "next"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { Container, CssBaseline, ThemeProvider, Typography, Box } from "@mui/material"
import theme from "@/app/theme"
import packageJson from '../../package.json'
import { SessionProvider } from '@/components/providers/SessionProvider'

// TODO: Fill up correct metadata + favicon when provided
export const metadata: Metadata = {
  title: "PDF Generator",
  description: "Generujte PDF dokumenty ze svých dat",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body style={{ margin: 0, padding: 0 }}>
        <SessionProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Box sx={{ flexGrow: 1 }}>
                  {children}
                </Box>
                <Box sx={{ py: 3, textAlign: 'center', borderTop: '1px solid #e5e7eb', mt: 8 }}>
                  <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                      v{packageJson.version}
                    </Typography>
                  </Container>
                </Box>
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
