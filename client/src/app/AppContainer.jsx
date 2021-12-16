import React from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import App from './App';

const theme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0052CC'
    },
    secondary: {
      main: '#FFFFFF'
    }
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 'bold'
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 'bold'
    },
    subtitle1: {
      fontSize: '0.813rem',
      fontWeight: 'bold'
    },
    subtitle2: {
      fontSize: '0.813rem'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.037rem',
      fontWeight: 400
    },
    button: {
      fontSize: '0.938rem',
      fontWeight: 'bold'
    }
  }
};

const AppContainer = () => {
  let createdTheme = createTheme(theme);
  createdTheme = responsiveFontSizes(createdTheme);
  return (
    <ThemeProvider theme={createdTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default AppContainer;
