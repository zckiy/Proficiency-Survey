import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/Responden/LandingPage';
import IsiDataIndustri from './pages/Responden/IsiDataIndustri';
import IsiDataAlumni from './pages/Responden/IsiDataAlumni';
import IsiDataDosen from './pages/Responden/IsiDataDosen';
import DiagramSurvey from './pages/Responden/DiagramSurvey';

import LoginAdmin from './admin/LoginAdmin'; 


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dataIndustri" element={<IsiDataIndustri />} />
        <Route path="/dataAlumni" element={<IsiDataAlumni />} />
        <Route path="/dataDosen" element={<IsiDataDosen />} />
        <Route path="/digramSurvey" element={<DiagramSurvey />} />
         

        <Route path="/" element={<LoginAdmin />} />
      </Routes>
    </Router>
    
  );
}

export default App;
