import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#E8F0FE', // Warna latar belakang halaman
        },
    },
});

function DiagramSurvey() {
    return (
        <ThemeProvider theme={theme}>
            Diagram 
        </ThemeProvider>
    );
}

export default DiagramSurvey;
