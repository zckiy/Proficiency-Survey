import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#dfe3ee', 
    },
  },
});

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode> 
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <App /> 
    </ThemeProvider>
  </React.StrictMode>
);
