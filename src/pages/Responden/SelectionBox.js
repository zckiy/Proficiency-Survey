import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Select, Grid, InputLabel, FormControl } from '@mui/material';
import { prodi } from '../../api/SurveiAPI';

const SelectionBox = ({ onProgramChange }) => {
  const [prodiData, setProdiData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('1');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onProgramChange(newValue);
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
        position: 'absolute',
        top: '77px',
        right: '10px',
        padding: '15px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="select-program-label">
              Pilih Program Studi
            </InputLabel>
            <Select
              labelId="prodi-label"
              id="prodi"
              name="prodiID"
              value={selectedOption}
              onChange={handleChange}
              label="-------------------------"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300, 
                  },
                },
              }}
              sx={{
                width: 230, 
              }}
            >
              {prodiData.map((prodi) => (
                <MenuItem key={prodi.prodiID} value={prodi.prodiID}>
                  {prodi.namaProdi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectionBox;