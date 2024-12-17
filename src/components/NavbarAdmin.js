import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from "@mui/material";
import OutputIcon from '@mui/icons-material/Output';
import Logo from "../assets/images/image.png";
import { Link, useLocation } from 'react-router-dom';

function NavbarAdmin({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah anda ingin Logout");
    if (confirmLogout) {
      onLogout && onLogout(); // Memastikan fungsi logout dipanggil jika tersedia
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#577399" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo dan Judul */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: 500 }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              height: "70px",
              marginLeft: "10px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
          <Typography variant="subtitle1" sx={{ color: "#fff", marginLeft: "10px" }}>
            Graduate Expected Proficiency <br /> Level Survey
          </Typography>
        </Box>

        {/* Navigasi dan Ikon */}
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
              borderBottom: isActive('/admin/responses') ? '3px solid #fff' : 'none',
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
          {/* Ikon Logout */}
          <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#6a85a1" },
              borderRadius: "50%",
              boxShadow: "none",
            }}
          >
            <OutputIcon style={{ fontSize: '30px' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarAdmin;