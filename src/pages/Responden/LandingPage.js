import * as React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, IconButton } from '@mui/material';
import Slider from 'react-slick'; // Import Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link } from 'react-router-dom';
import IsiDataAlumni from './IsiDataAlumni';
import IsiDataDosen from './IsiDataDosen';
import IsiDataIndustri from './IsiDataIndustri';

// Impor gambar dengan jalur yang benar
import lulusanImage from '../../assets/images/lulusan.png';
import polibatamImage from '../../assets/images/polibatam.png';
import alumniImage from '../../assets/images/alumni.png';
import graduateImage from '../../assets/images/graduate.png';
import dosenImage from '../../assets/images/dosen.png';
import industriImage from '../../assets/images/industri.png';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Komponen Anak Panah Kiri
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} style={{ position: 'absolute', left: '5px', top: '40%', zIndex: 1 }}>
      <ArrowBackIosIcon style={{ fontSize: '30px', color: '#577399' }} />
    </IconButton>
  );
};

// Komponen Anak Panah Kanan
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} style={{ position: 'absolute', right: '5px', top: '40%', zIndex: 1 }}>
      <ArrowForwardIosIcon style={{ fontSize: '30px', color: '#577399' }} />
    </IconButton>
  );
};

function LandingPages() {
  // Pengaturan slider
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
    <Box>
      <Container maxWidth="xl" sx={{ textAlign: 'center', marginTop: 4 }}>
        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
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

      {/* Section Isi Survei */}
      <Container maxWidth="lg" sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          ISI SURVEY SEBAGAI
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <Link to="/dataAlumni">
                <Box
                  component="img"
                  src={alumniImage}
                  alt="Alumni"
                  sx={{
                    width: '50%',
                    height: 140,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { opacity: 0.7 }, // Mengubah opacity saat hover
                  }}
                  onClick={() => console.log('Navigating to Alumni page...')} // Tindakan saat gambar di-klik
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
                    width: '50%',
                    height: 140,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { opacity: 0.7 }, // Mengubah opacity saat hover
                  }}
                  onClick={() => console.log('Navigating to Dosen page...')} // Tindakan saat gambar di-klik
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
                    width: '50%',
                    height: 140,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { opacity: 0.7 }, // Mengubah opacity saat hover
                  }}
                  onClick={() => console.log('Navigating to Industri page...')} // Tindakan saat gambar di-klik
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

      {/* Footer */}
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
        {/* Routing */}
        <Routes>
          <Route path="/dataAlumni" element={<IsiDataAlumni />} />
          <Route path="/dataDosen" element={<IsiDataDosen />} />
          <Route path="/dataIndustri" element={<IsiDataIndustri />} />

        </Routes>
        <Typography variant="body2">@ 2024 - Level Survey</Typography>
      </Box>
    </Box>
  );
}

export default LandingPages;
