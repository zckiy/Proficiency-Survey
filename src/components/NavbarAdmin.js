import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/image.png';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout'; // Impor ikon logout

function NavbarAdmin({ isLoggedIn, onLogout }) { // Menambahkan onLogout prop
    return (
        <AppBar position="static" sx={{ backgroundColor: '#577399' }}>
            <Toolbar>
                {/* Logo dan Judul di sisi kiri */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/dashboardAdmin" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{
                                height: '70px',
                                marginLeft: '10px',
                                marginRight: '10px',
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}
                        />
                        <Typography variant="h6" sx={{ color: '#fff', marginLeft: '5px' }}>
                            Graduate Expected Proficiency <br />Level Survey
                        </Typography>
                    </Link>
                </Box>

                {/* Tombol Navigasi di sisi kanan */}
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/dashboardAdmin" sx={{ mx: 1 }}>
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/diagramSurvey" sx={{ mx: 1 }}>
                        Diagram
                    </Button>

                    {/* Tombol Login/Logout dengan Ikon */}
                    <Button
                        component={Link}
                        to="/loginAdmin"
                        variant="contained"
                        color="default"
                        startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />} // Ganti ikon sesuai status login
                        sx={{
                            backgroundColor: '#445d80', // Biru gelap yang sesuai dengan navbar
                            color: '#fff', // Warna putih untuk teks dan ikon
                            '&:hover': {
                                backgroundColor: '#6a85a1', // Biru lebih terang saat hover
                            },
                            borderRadius: '8px', // Sudut melengkung untuk tombol
                            padding: '6px 16px', // Ukuran padding tombol
                            textTransform: 'none', // Nonaktifkan huruf kapital pada teks
                            ml: 2, // Jarak dari tombol sebelumnya
                        }}
                        onClick={isLoggedIn ? onLogout : null} // Panggil onLogout jika sudah login
                    >
                        {isLoggedIn ? 'Logout' : 'Login'} {/* Ganti teks sesuai status login */}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavbarAdmin;
