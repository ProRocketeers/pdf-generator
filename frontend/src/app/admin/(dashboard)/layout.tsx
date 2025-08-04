'use client'

import { ReactNode, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from '@mui/material'
import {
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data: session, status } = useSession()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    handleMenuClose()
    await signOut({ callbackUrl: `${basePath}/admin/login` })
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AdminIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>

          {/* User info section */}
          {session?.user && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Box sx={{ textAlign: 'right', mr: 2 }}>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  {session.user.name || 'Neznámý uživatel'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {session.user.email}
                </Typography>
              </Box>
            </Box>
          )}

          <IconButton
            size="large"
            edge="end"
            onClick={handleMenuOpen}
            color="inherit"
            sx={{ p: 0.5 }}
          >
            {session?.user?.image ? (
              <Avatar
                src={session.user.image}
                alt={session.user.name || 'User'}
                sx={{ width: 40, height: 40 }}
              />
            ) : (
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)' }}>
                {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: { minWidth: 250 }
            }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
              Odhlásit se
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  )
}
