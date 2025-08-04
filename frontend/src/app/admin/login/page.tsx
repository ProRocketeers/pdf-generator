'use client'

import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Alert,
  Container,
  CircularProgress,
} from '@mui/material'
import {
  AdminPanelSettings as AdminIcon,
  Google as GoogleIcon,
} from '@mui/icons-material'

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Zkontroluj, zda už není uživatel přihlášený
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push('/admin')
      }
    }
    checkSession()
  }, [router])

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      const result = await signIn('google', {
        callbackUrl: '/admin',
        redirect: false,
      })

      if (result?.error) {
        setError('Přihlášení se nezdařilo. Ujistěte se, že používáte email z našeho workspace.')
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch {
      setError('Došlo k chybě při přihlášení.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      px: 2,
      margin: 0,
      overflow: 'hidden'
    }}>
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{
          width: '100%',
          maxWidth: 600,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          borderRadius: 2
        }}>
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <AdminIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Přihlaste se pomocí Google účtu z našeho workspace
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleGoogleSignIn}
              disabled={loading}
              sx={{
                py: 2,
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                }
              }}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
            >
              {loading ? 'Přihlašuji...' : 'Přihlásit se přes Google'}
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Pouze uživatelé z našeho Google Workspace
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
