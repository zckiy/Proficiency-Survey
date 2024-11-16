import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ThemeProvider, createTheme } from '@mui/material';
import SelectionBox from './SelectionBox';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const theme = createTheme({
  palette: {
    background: {
      default: '#dfe3ee', // Warna latar belakang halaman
    },
  },
});

const DiagramSurvey = () => {
  const [selectedProgram, setSelectedProgram] = React.useState('D3 Teknik Informatika');

  const dataSets = {
    'D3 Teknik Informatika': {
      labels: ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4', '2.5', '3.1', '3.2'],
      datasets: [
        { label: 'Industri', data: [3.5, 4.0, 3.8, 3.2, 3.6, 3.0, 4.5, 3.4, 3.6, 4.0, 3.8], backgroundColor: 'blue' },
        { label: 'Alumni Senior', data: [3.0, 3.5, 4.2, 3.8, 3.3, 3.5, 4.8, 3.1, 3.7, 4.7, 4.0], backgroundColor: 'red' },
        { label: 'Alumni Junior', data: [3.8, 4.5, 4.0, 3.6, 3.7, 3.4, 4.3, 3.2, 4.0, 3.9, 4.2], backgroundColor: 'yellow' },
        { label: 'Dosen', data: [4.0, 4.2, 4.8, 4.0, 3.9, 4.2, 4.0, 3.9, 4.3, 4.5, 4.6], backgroundColor: 'green' },
      ],
    },
    'D3 Teknologi Geomatika': {
      labels: ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4', '2.5', '3.1', '3.2'],
      datasets: [
        { label: 'Industri', data: [4.0, 4.1, 4.3, 4.2, 4.0, 4.1, 4.5, 4.4, 4.3, 4.0, 4.5], backgroundColor: 'blue' },
        { label: 'Alumni Senior', data: [3.5, 3.8, 4.0, 3.9, 3.7, 3.6, 4.1, 3.8, 4.0, 4.2, 4.1], backgroundColor: 'red' },
        { label: 'Alumni Junior', data: [4.2, 4.4, 4.5, 4.3, 4.1, 4.0, 4.2, 4.1, 4.0, 4.3, 4.4], backgroundColor: 'yellow' },
        { label: 'Dosen', data: [4.1, 4.3, 4.4, 4.2, 4.0, 4.2, 4.3, 4.1, 4.0, 4.2, 4.3], backgroundColor: 'green' },
      ],
    },
    'D3 Animasi': {
      labels: ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4', '2.5', '3.1', '3.2'],
      datasets: [
        { label: 'Industri', data: [3.7, 4.2, 3.9, 4.0, 3.8, 4.1, 4.0, 3.5, 3.8, 4.1, 4.0], backgroundColor: 'blue' },
        { label: 'Alumni Senior', data: [3.6, 3.9, 4.1, 4.2, 3.8, 3.7, 4.3, 3.9, 4.1, 4.0, 3.8], backgroundColor: 'red' },
        { label: 'Alumni Junior', data: [4.0, 4.1, 4.4, 4.2, 4.0, 4.3, 4.5, 4.2, 4.3, 4.4, 4.1], backgroundColor: 'yellow' },
        { label: 'Dosen', data: [4.2, 4.4, 4.5, 4.3, 4.1, 4.2, 4.3, 4.4, 4.2, 4.3, 4.5], backgroundColor: 'green' },
      ],
    },
    'D4 Teknologi Rekayasa Multimedia': {
      labels: ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4', '2.5', '3.1', '3.2'],
      datasets: [
        { label: 'Industri', data: [3.9, 4.0, 4.1, 4.3, 4.2, 4.0, 4.1, 4.2, 4.1, 4.4, 4.2], backgroundColor: 'blue' },
        { label: 'Alumni Senior', data: [3.5, 3.7, 4.0, 4.1, 3.8, 3.9, 4.2, 4.0, 4.1, 4.3, 4.2], backgroundColor: 'red' },
        { label: 'Alumni Junior', data: [4.1, 4.2, 4.4, 4.5, 4.0, 4.3, 4.5, 4.2, 4.4, 4.1, 4.3], backgroundColor: 'yellow' },
        { label: 'Dosen', data: [4.0, 4.2, 4.3, 4.4, 4.1, 4.0, 4.2, 4.3, 4.2, 4.4, 4.5], backgroundColor: 'green' },
      ],
    },
    'D4 Rekayasa Keamanan Siber': {
      labels: ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4', '2.5', '3.1', '3.2'],
      datasets: [
        { label: 'Industri', data: [4.1, 4.2, 4.4, 4.3, 4.5, 4.4, 4.3, 4.2, 4.1, 4.0, 4.2], backgroundColor: 'blue' },
        { label: 'Alumni Senior', data: [3.9, 4.0, 4.1, 4.3, 4.2, 4.1, 4.0, 4.1, 4.3, 4.2, 4.0], backgroundColor: 'red' },
        { label: 'Alumni Junior', data: [4.0, 4.1, 4.3, 4.5, 4.2, 4.1, 4.3, 4.0, 4.1, 4.2, 4.3], backgroundColor: 'yellow' },
        { label: 'Dosen', data: [4.2, 4.3, 4.4, 4.5, 4.1, 4.0, 4.3, 4.2, 4.4, 4.5, 4.3], backgroundColor: 'green' },
      ],
    },

  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 30,
          boxHeight: 20,
          padding: 30,
        },
      },
      title: {
        display: true,
        text: `Expected Proficiency Level Survey - ${selectedProgram}`,
        font: {
          size: 20,
          weight: 'bold',
          family: 'Arial',
        },
        padding: {
          bottom: 40,
        },
      },
    },
    scales: {
      y: {
        min: 2,
        max: 5,
      },
    },
  };

  const handleProgramChange = (program) => {
    setSelectedProgram(program);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '130px' }}>
        <div style={{ width: '80%', height: '500px' }}>
          <Bar data={dataSets[selectedProgram]} options={options} />
          <SelectionBox onProgramChange={handleProgramChange} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DiagramSurvey;
