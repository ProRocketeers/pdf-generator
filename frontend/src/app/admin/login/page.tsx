'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings as AdminIcon,
  Lock as LockIcon,
} from '@mui/icons-material'

// Heslo natvrdo - v produkci by mělo být v environment variables
const ADMIN_PASSWORD = 'admin123'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulace delay pro autentizaci
    await new Promise(resolve => setTimeout(resolve, 500))

    if (password === ADMIN_PASSWORD) {
      // Nastav cookie pro autentizaci
      document.cookie = 'admin-auth=authenticated; path=/; max-age=86400' // 24 hodin

      router.push('/admin')
    } else {
      setError('Nesprávné heslo')
    }

    setLoading(false)
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
                Zadejte heslo pro přístup k administraci
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Admin heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoFocus
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                  }
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? 'Ověřuji...' : 'Přihlásit se'}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Pro demo účely: heslo je "admin123"
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
