import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/image.png';
import DiagramSurvey from '../pages/Responden/DiagramSurvey';

const pages = [
    { name: 'Home', path: '/home' },
    { name: 'Diagram', path: '/diagram' },
    { name: 'Survey', path: '/survey' },
    { name: 'Prodi', path: '/prodi' }
];

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#577399' }}>
      <Toolbar>
        {/* Logo dan Judul di sisi kiri */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ height: '70px', marginLeft: '10px', marginRight: '10px', marginTop: '10px', marginBottom: '10px' }} />
          <Typography variant="h6" sx={{ color: '#fff', marginLeft: '5px' }}>
            Graduate Expected Proficiency <br/>Level Survey
          </Typography>
        </Box>

        {/* Tombol Navigasi di sisi kanan */}
        <Box sx={{ ml: 'auto' }}>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/digramSurvey" sx={{ mx: 1 }}>
            Diagram
          </Button>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            #
          </Button>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            #
          </Button>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            #
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
