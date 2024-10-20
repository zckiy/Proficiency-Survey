import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, IconButton, useTheme } from '@mui/material';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link } from 'react-router-dom';
import IsiDataAlumni from './IsiDataAlumni';
import IsiDataDosen from './IsiDataDosen';
import IsiDataIndustri from './IsiDataIndustri';

import lulusanImage from '../../assets/images/lulusan.png';
import polibatamImage from '../../assets/images/polibatam.png';
import alumniImage from '../../assets/images/alumni.png';
import graduateImage from '../../assets/images/graduate.png';
import dosenImage from '../../assets/images/dosen.png';
import industriImage from '../../assets/images/industri.png';

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

function LandingPages() {
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
      <Container maxWidth="xl" sx={{ textAlign: 'center', marginTop: 1 }}>
        <Grid item xs={12} md={6}>
          <Slider {...settings}>
            <Box>
              <img src={lulusanImage} alt="Lulusan" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            </Box>
            <Box>
              <img src={polibatamImage} alt="Politeknik Negeri Batam" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            </Box>
            <Box>
              <img src={graduateImage} alt="Graduate" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            </Box>
          </Slider>

          <Card sx={{ backgroundColor: '#f5f5f5', padding: 2, marginTop: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Graduate Expected Proficiency Level Survey
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Untuk mengetahui tingkat profisiensi lulusan yang dapat dijadikan evaluasi dalam sistem pendidikan.
                Aplikasi ini membantu memantau lulusan, serta dosen, alumni junior, alumni senior, dan industri.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          ISI SURVEY SEBAGAI
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <Link to="/dataAlumni">
                <Box
                  component="img"
                  src={alumniImage}
                  alt="Alumni"
                  sx={{
                    marginTop: '5px',
                    width: '50%',
                    height: 140,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { opacity: 0.7 }, 
                  }}
                  onClick={() => console.log('Navigating to Alumni page...')} 
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  ALUMNI
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <Link to="/dataDosen">
                <Box
                  component="img"
                  src={dosenImage}
                  alt="Dosen"
                  sx={{
                    marginTop: '5px',
                    width: '50%',
                    height: 140,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { opacity: 0.7 }, 
                  }}
                  onClick={() => console.log('Navigating to Dosen page...')} 
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  DOSEN
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <Link to="/dataIndustri">
                <Box
                  component="img"
                  src={industriImage}
                  alt="Industri"
                  sx={{
                    marginTop: '5px',
                    width: '50%',
                    height: 140,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { opacity: 0.7 }, 
                  }}
                  onClick={() => console.log('Navigating to Industri page...')} 
                />
              </Link>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  INDUSTRI
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      
      <Box>
        <Routes>
          <Route path="/dataAlumni" element={<IsiDataAlumni />} />
          <Route path="/dataDosen" element={<IsiDataDosen />} />
          <Route path="/dataIndustri" element={<IsiDataIndustri />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default LandingPages;
