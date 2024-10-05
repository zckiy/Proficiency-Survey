import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from '../assets/images/image.png';

const pages = ['Home', 'Diagram', 'Survey', 'Prodi'];

function ResponsiveAppBar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#577399', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Container maxWidth="">
                <Toolbar disableGutters>
                    {/* Logo dan Judul */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            component="img"
                            src={Logo}
                            alt="Logo"
                            sx={{ height: 50, width: 'auto', marginRight: 2 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                fontFamily: 'Nunito, sans-serif',
                                fontWeight: 600,
                                letterSpacing: '.05rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                lineHeight: 1.2,
                            }}
                        >
                            Graduate Expected Proficiency<br />Level Survey
                        </Typography>
                    </Box>

                    {/* Menu Navigasi */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ 
                                    my: 2, 
                                    color: 'white', 
                                    display: 'block', 
                                    textTransform: 'none', 
                                    fontWeight: 500, 
                                    mx: 1, 
                                    '&:hover': { 
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                                        borderRadius: 1 
                                    } 
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
