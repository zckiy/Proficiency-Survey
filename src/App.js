import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import LandingPage from './pages/Responden/LandingPage';
import IsiDataIndustri from './pages/Responden/IsiDataIndustri';
import IsiDataAlumni from './pages/Responden/IsiDataAlumni';
import IsiDataDosen from './pages/Responden/IsiDataDosen';
import DiagramSurvey from './pages/Responden/DiagramSurvey';
import LoginAdmin from './admin/LoginAdmin';
import Survei from './pages/Responden/Survei';
import TerimakasihPage from './pages/Responden/TerimakasihPage';
import Tentang from './pages/Responden/Tentang';
import PilihProdi from './pages/Responden/PilihProdi';

import DashboardAdmin from './admin/DashboardAdmin';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  const hideNavbarRoutes = [
    '/dataAlumni',
    '/dataDosen',
    '/dataIndustri',
    '/loginAdmin',
    '/survei',
    '/terimakasih',
    '/pilihProdi'
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dataIndustri" element={<IsiDataIndustri />} />
        <Route path="/dataAlumni" element={<IsiDataAlumni />} />
        <Route path="/dataDosen" element={<IsiDataDosen />} />
        <Route path="/digramSurvey" element={<DiagramSurvey />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/survei" element={<Survei />} />
        <Route path="/terimakasih" element={<TerimakasihPage />} />
        <Route path="/tentang/*" element={<Tentang />} />
        <Route path="/pilihProdi" element={<PilihProdi />} />

        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      </Routes>

      <Footer /> 
    </>
  );
}

export default App;
