import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/image.png';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function NavbarAdmin({ isLoggedIn, onLogout }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    return (
        <AppBar position="static" sx={{ backgroundColor: '#577399' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: 500 }}>
                    <Link to="/admin/question" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{
                                height: '70px',
                                marginLeft: '10px',
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}
                        />
                        <Typography variant="h7" sx={{ color: '#fff', marginLeft: '5px' }}>
                            Graduate Expected Proficiency <br />Level Survey
                        </Typography>
                    </Link>
                </Box>

                {/* Tombol Navigasi di sisi kanan */}
                <Box sx={{ width: '50%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/admin/question"
                        sx={{
                            borderBottom: isActive('/admin/question') ? '3px solid #fff' : 'none',
                            textTransform: 'none'
                        }}
                    >
                        Questions
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/responses"
                        sx={{
                            borderBottom: isActive('/responses') ? '3px solid #fff' : 'none',
                            textTransform: 'none'
                        }}
                    >
                        Responses
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/admin/diagram"
                        sx={{
                            borderBottom: isActive('/admin/diagram') ? '3px solid #fff' : 'none',
                            textTransform: 'none'
                        }}
                    >
                        Result
                    </Button>
                </Box>
                <Box sx={{ width: 500, justifyContent: 'end', display: 'flex', alignItems: 'center' }}>
                    <Button
                        component={Link}
                        to="/admin/login"
                        variant="contained"
                        color="default"
                        startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                        sx={{
                            backgroundColor: '#445d80',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#6a85a1' },
                            borderRadius: '8px',
                            padding: '6px 16px',
                            textTransform: 'none',
                            alignItems: 'right',
                        }}
                        onClick={isLoggedIn ? onLogout : null}
                    >
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavbarAdmin;
