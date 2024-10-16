import React from 'react';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
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
      © 2024 Graduate Expected Proficiency Level Survey - All Rights Reserved
    </Box>
  );
};

export default Footer;
