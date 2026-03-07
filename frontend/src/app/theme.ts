'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#051641',
    },
    secondary: {
      main: '#f43f5e',
    },
    background: {
      default: '#f8f9ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#1f2937',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1f2937',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '14px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

export default theme;
