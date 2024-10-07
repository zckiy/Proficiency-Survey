import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create theme
const theme = createTheme({
  palette: {
      background: {
          default: '#E8F0FE', // Warna latar belakang halaman
      },
  },
});

// Get root element
const container = document.getElementById('root');

// Create root and render the app
const root = ReactDOM.createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
