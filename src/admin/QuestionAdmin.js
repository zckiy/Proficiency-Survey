import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, IconButton, useTheme,TextField } from '@mui/material';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} style={{ position: 'absolute', left: '5px', top: '40%', zIndex: 1 }}>
      <ArrowBackIosIcon style={{ fontSize: '30px', color: '#577399' }} />
    </IconButton>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} style={{ position: 'absolute', right: '5px', top: '40%', zIndex: 1 }}>
      <ArrowForwardIosIcon style={{ fontSize: '30px', color: '#577399' }} />
    </IconButton>
  );
};

function DashboardAdmin() {
  const theme = useTheme();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
<Box sx={{ backgroundColor: theme.palette.background.default }}>
  <Container sx={{ textAlign: 'center', marginTop: 11}}>
    <Card sx={{ backgroundColor: '#f5f5f5', padding: 2, marginTop: 4 }}>
      <CardContent>
      <TextField fullWidth label="fullWidth" id="fullWidth" />
      </CardContent>
    </Card>
  </Container>
</Box>
  );
}

export default DashboardAdmin;
