import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, CssBaseline, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/images/image.png';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../api/LoginAPI';

// Buat tema dengan latar belakang khusus
const theme = createTheme({
    palette: {
        background: {
            default: '#E8F0FE',
        },
    },
});

function LoginAdmin({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inisialisasi useNavigate

    // Fungsi untuk menangani login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error sebelum memulai autentikasi

        try {
            const authResponse = await loginAdmin(username, password);
            if (authResponse.success) {
                setError('');
                alert(authResponse.message);
                onLoginSuccess(); // Panggil callback jika login sukses
                navigate('/admin/question');
            } else {
                setError(authResponse.message);
            }
        } catch (error) {
            console.error(error);
            setError('Terjadi kesalahan saat mencoba login.');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs" sx={{ marginTop: '50px' }}>
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        display: 'block',
                        width: '120px',
                        height: '100px',
                        margin: '0 auto 10px auto',
                        animation: 'float 3s ease-in-out infinite',
                    }}
                />
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        marginBottom: '20px',
                        fontFamily: 'Aboreto, sans-serif',
                        fontSize: '22px',
                        color: '#34495E',
                        letterSpacing: '1px',
                    }}
                >
                    GRADUATE EXPECTED <br /> PROFICIENCY LEVEL SURVEY
                </Typography>
                <Box
                    sx={{
                        backgroundColor: '#577399',
                        padding: '30px',
                        borderRadius: '15px',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
                        height: '450px',
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ fontFamily: 'Aboreto, sans-serif', color: '#fff', marginBottom: '25px' }}
                    >
                        LOGIN
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ marginBottom: '15px' }}>
                            {error}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleLogin}>
                        <Box sx={{ marginBottom: '20px' }}>
                            <Typography sx={{ fontFamily: 'Aboreto, sans-serif', color: '#fff', marginBottom: '5px' }}>
                                Username
                            </Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#007BFF',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#0056b3',
                                        },
                                    },
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: '20px' }}>
                            <Typography sx={{ fontFamily: 'Aboreto, sans-serif', color: '#fff', marginBottom: '5px' }}>
                                Password
                            </Typography>
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#007BFF',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#0056b3',
                                        },
                                    },
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#fff',
                                    color: '#007BFF',
                                    width: '60%',
                                    fontWeight: 'bold',
                                    transition: 'background-color 0.3s, transform 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginAdmin;
