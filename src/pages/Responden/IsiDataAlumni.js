import React from 'react';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Buat tema dengan latar belakang khusus
const theme = createTheme({
    palette: {
        background: {
            default: '#E8F0FE', // Warna latar belakang halaman
        },
    },
});

function IsiDataAlumni() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs" sx={{ marginTop: '50px' }}>
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            color: '#333',
                        }}
                    >
                        Data Diri
                    </Typography>
                    <TextField
                        label="Nama"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        
                        
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        
                        
                    />
                    <TextField
                        label="Status"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    
                    />
                    <TextField
                        label="Tahun Kelulusan"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        
                    />
                    <TextField
                        label="Prodi"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: '#577399',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#4a6178',
                                },
                            }}
                        >
                            Lanjut
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: '20px',
                        padding: '30px',
                        backgroundColor: '#577399',
                        textAlign: 'center',
                        color: '#fff',
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    <Typography variant="body2">@ 2024 - Level Survey</Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default IsiDataAlumni;
