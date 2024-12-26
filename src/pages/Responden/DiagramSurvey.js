import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ThemeProvider, createTheme, CircularProgress, Box } from '@mui/material';
import SelectionBox from './SelectionBox';
import { diagramData } from '../../api/DiagramAPI';
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
      default: '#dfe3ee',
    },
  },
});

const DiagramSurvey = () => {
  const [dataSets, setDiagramData] = useState({});
  const [selectedProgram, setSelectedProgram] = useState('1');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await diagramData();
        console.log('API Response:', response);
        const formattedData = Object.keys(response).reduce((acc, programID) => {
          const programData = response[programID];
          acc[programID] = {
            labels: programData.kodePertanyaan,
            datasets: programData.datasets.map((dataset) => ({
              label: dataset.tipeRes,
              data: dataset.avgJawaban,
              backgroundColor: dataset.bgColor,
            })),
            namaProdi: programData.namaProdi,
          };
          return acc;
        }, {});
        setDiagramData(formattedData);
      } catch (error) {
        console.error('Error fetching prodi data:', error);
      }
    };

    fetchData();
  }, []);

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
        text: `Expected Proficiency Level Survey - ${dataSets[selectedProgram]?.namaProdi || 'Unknown Program'
          }`,
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
        min: 0,
        max: 5,
      },
    },
  };

  const handleProgramChange = (program) => {
    setSelectedProgram(program);
  };

  const data = dataSets[selectedProgram] || {
    labels: [],
    datasets: [],
  };

  if (!Object.keys(dataSets).length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '130px' }}>
        <div style={{ width: '90%', height: '500px' }}>
          <Bar data={data} options={options} />
          <SelectionBox onProgramChange={handleProgramChange} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DiagramSurvey;