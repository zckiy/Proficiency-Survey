import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../assets/images/image.png';

function NavbarAdmin() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget); // Membuka menu pada posisi ikon
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Menutup menu
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#577399' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: 500 }}>
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{
                            height: '70px',
                            marginLeft: '10px',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}
                    />
                    <Typography variant="h7" sx={{ color: '#fff', marginLeft: '5px' }}>
                        Graduate Expected Proficiency <br /> Level Survey
                    </Typography>
                </Box>

                {/* Navigasi dan Ikon */}
                <Box
                    sx={{
                        width: 500,
                        justifyContent: 'end',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {/* Tombol Navigasi */}
                    <Button
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            marginRight: '10px',
                            color: '#fff',
                            '&:hover': { color: '#dfe6ed' },
                        }}
                    >
                        Questions
                    </Button>
                    <Button
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            marginRight: '10px',
                            color: '#fff',
                            '&:hover': { color: '#dfe6ed' },
                        }}
                    >
                        Result
                    </Button>

                    {/* Ikon Akun */}
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen} // Menu muncul saat ikon diklik
                        sx={{
                            color: '#fff',
                            '&:hover': { backgroundColor: '#6a85a1' },
                            borderRadius: '50%',
                            boxShadow: 'none',
                        }}
                    >
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)} // Menu terbuka jika anchorEl tidak null
                        onClose={handleMenuClose} // Menutup menu saat klik di luar
                    >
                        <MenuItem onClick={handleMenuClose}>Login</MenuItem>

                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavbarAdmin;
