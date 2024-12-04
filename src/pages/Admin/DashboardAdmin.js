import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, IconButton, useTheme } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Graduate Expected Proficiency Level Survey
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Tujuan survei ini adalah untuk memahami harapan dan tingkat kemahiran yang diinginkan dari para lulusan dalam berbagai bidang kompetensi. 
                  Informasi yang Anda berikan akan sangat berharga bagi kami dalam meningkatkan kualitas pendidikan dan persiapan karier lulusan.
          </Typography>
      </CardContent>
    </Card>
  </Container>
</Box>
  );
}

export default DashboardAdmin;
