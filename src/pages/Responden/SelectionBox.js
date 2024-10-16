import React from 'react';
import { Box, MenuItem, Select, Grid, InputLabel, FormControl } from '@mui/material';

const SelectionBox = ({ onProgramChange }) => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onProgramChange(newValue); 
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '90px',
        right: '110px',
        padding: '20px',
        zIndex: 1000, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="select-program-label" shrink sx={{fontWeight: 'Bold'}}>
              Pilih Program Studi
            </InputLabel>
            <Select
              label="Pilih Program Studiii"
              labelId="select-program-label"
              value={selectedOption}
              onChange={handleChange}
              displayEmpty
              sx={{ width: '220px' }}
            >
              <MenuItem value="" disabled>
                -- Pilih --
              </MenuItem>
              <MenuItem value="D3 Teknik Informatika">D3 Teknik Informatika</MenuItem>
              <MenuItem value="D3 Teknologi Geomatika">D3 Teknologi Geomatika</MenuItem>
              <MenuItem value="D3 Animasi">D3 Animasi</MenuItem>
              <MenuItem value="D4 Teknologi Rekayasa Multimedia">D4 Teknologi Rekayasa Multimedia</MenuItem>
              <MenuItem value="D4 Rekayasa Keamanan Siber">D4 Rekayasa Keamanan Siber</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectionBox;
