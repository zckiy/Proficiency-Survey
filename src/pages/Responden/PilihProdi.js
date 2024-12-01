import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { prodi } from '../../api/SurveiAPI';
import { Box, Typography, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

const PilihProdi = () => {
  const [selectedJurusan, setSelectedJurusan] = useState('');
  const [selectedProdi, setSelectedProdi] = useState('');
  const [prodiData, setProdiData] = useState([]);
  const [jurusanData, setJurusanData] = useState([]);
  const [filteredProdi, setFilteredProdi] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { respondenID } = location.state || {};

  const handleJurusanChange = (event) => {
    const jurusanID = event.target.value;
    setSelectedJurusan(jurusanID);

    // Filter prodi berdasarkan jurusan yang dipilih
    const filtered = prodiData.filter((item) => item.jurusanID === jurusanID);
    setFilteredProdi(filtered);
    setSelectedProdi(''); // Reset selected prodi when jurusan changes
  };

  const handleProdiChange = (event) => {
    setSelectedProdi(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedProdi) {
      if (respondenID) {
        navigate(`/survei/${selectedProdi}`, { state: { respondenID } });
      } else {
        alert('respondenID tidak ditemukan!');
      }
    } else {
      alert('Silakan pilih program studi terlebih dahulu!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await prodi();
        setProdiData(data);

        // Extract unique jurusan data from prodi
        const uniqueJurusan = [
          ...new Map(
            data.map((item) => [item.jurusanID, item.namaJurusan])
          ),
        ].map(([jurusanID, namaJurusan]) => ({
          jurusanID,
          namaJurusan,
        }));

        setJurusanData(uniqueJurusan);
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
        height: '100vh',
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

        {/* Select Jurusan */}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel
            id="jurusan-label"
            shrink
            sx={{
              backgroundColor: '#fff',
              padding: '0 4px',
              marginLeft: '-4px',
            }}
          >
            Jurusan
          </InputLabel>
          <Select
            labelId="jurusan-label"
            id="jurusan"
            value={selectedJurusan}
            onChange={handleJurusanChange}
            label=""
          >
            <MenuItem value="">
              <em>-- Pilih Jurusan --</em>
            </MenuItem>
            {jurusanData.map((jurusan) => (
              <MenuItem key={jurusan.jurusanID} value={jurusan.jurusanID}>
                {jurusan.namaJurusan}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Select Prodi */}
        <FormControl fullWidth sx={{ marginBottom: '25px', marginTop: '20px' }}>
          <InputLabel
            id="prodi-label"
            shrink
            sx={{
              backgroundColor: '#fff',
              padding: '0 4px',
              marginLeft: '-4px',
            }}
          >
            Pilih Prodi
          </InputLabel>
          <Select
            labelId="prodi-label"
            id="prodi"
            value={selectedProdi}
            onChange={handleProdiChange}
            label=""
            disabled={!selectedJurusan} // Disable if no jurusan is selected
          >
            <MenuItem value="">
              <em>-- Pilih Prodi --</em>
            </MenuItem>
            {filteredProdi.map((prodi) => (
              <MenuItem key={prodi.prodiID} value={prodi.prodiID}>
                {prodi.namaProdi}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Submit Button */}
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
