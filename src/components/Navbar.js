import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/image.png';

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#577399' }}>
      <Toolbar>
        {/* Logo dan Judul di sisi kiri */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src={Logo} 
              alt="Logo" 
              style={{ 
                height: '50px', 
                marginLeft: '10px', 
                marginRight: '10px', 
                marginTop: '15px', 
                marginBottom: '15px' 
              }} 
            />
            <Typography variant="h7" sx={{ color: '#fff', marginLeft: '8px' }}>
              Graduate Expected Proficiency <br/>Level Survey
            </Typography>
          </Link>
        </Box>

        {/* Tombol Navigasi di sisi kanan */}
        <Box sx={{ ml: 'auto', mr: '5px' }}>
          <Button color="inherit" component={Link} to="/" sx={{ mx: 1 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/diagram" sx={{ mx: 1 }}>
            RESULT
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
