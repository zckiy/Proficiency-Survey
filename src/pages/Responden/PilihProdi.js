import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { prodi } from '../../api/SurveiAPI';
import { Box, Typography, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

const PilihProdi = () => {
  const [selectedProdi, setSelectedProdi] = useState('');
  const [prodiData, setProdiData] = useState([]);
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedProdi(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedProdi) {
      navigate(`/survei/${selectedProdi}`);
    } else {
      alert('Silakan pilih jurusan terlebih dahulu!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await prodi();
        setProdiData(data);
      } catch (error) {
        console.error('Error fetching prodi data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Pilih Program Studi
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: '25px' }}>
          <InputLabel id="prodi-label">Pilih Prodi</InputLabel>
          <Select
            labelId="prodi-label"
            id="prodi"
            value={selectedProdi}
            onChange={handleSelectChange}
            label="Pilih Prodi"
          >
            <MenuItem value="">
              <em>-- Pilih Prodi --</em>
            </MenuItem>
            {prodiData.map((prodi) => (
              <MenuItem key={prodi.prodiID} value={prodi.prodiID}>
                {prodi.namaProdi}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            padding: '10px 20px',
            backgroundColor: '#577399',
            '&:hover': { backgroundColor: '#4A90E2' },
          }}
        >
          Lanjut
        </Button>
      </Box>
    </Box>
  );
};

export default PilihProdi;