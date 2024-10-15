import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/Responden/LandingPage';
import IsiDataIndustri from './pages/Responden/IsiDataIndustri';
import IsiDataAlumni from './pages/Responden/IsiDataAlumni';
import IsiDataDosen from './pages/Responden/IsiDataDosen';
import DiagramSurvey from './pages/Responden/DiagramSurvey';
import LoginAdmin from './admin/LoginAdmin';
import Survei from './pages/Responden/Survei';
import TerimakasihPage from './pages/Responden/TerimakasihPage';

// Komponen utama aplikasi
function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

// Komponen untuk mengatur apakah Navbar akan muncul atau tidak
function Main() {
  const location = useLocation();
  
  // Tentukan rute di mana navbar tidak akan muncul
  const hideNavbarRoutes = [
    '/dataAlumni',
    '/dataDosen',
    '/dataIndustri',
    // '/digramSurvey',
    '/loginAdmin'
  ];

  // Tentukan apakah navbar harus ditampilkan berdasarkan rute saat ini
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Tampilkan Navbar hanya jika rutenya tidak ada di dalam hideNavbarRoutes */}
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
      </Routes>
    </>
  );
}

export default App;