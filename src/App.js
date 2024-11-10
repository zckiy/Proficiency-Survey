import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import LandingPage from './pages/Responden/LandingPage';
import IsiDataIndustri from './pages/Responden/IsiDataIndustri';
import IsiDataAlumni from './pages/Responden/IsiDataAlumni';
import IsiDataDosen from './pages/Responden/IsiDataDosen';
import DiagramSurvey from './pages/Responden/DiagramSurvey';
import Survei from './pages/Responden/Survei';
import TerimakasihPage from './pages/Responden/TerimakasihPage';
import Tentang from './pages/Responden/Tentang';
import PilihProdi from './pages/Responden/PilihProdi';

import NavbarAdmin from './components/NavbarAdmin';
import LoginAdmin from './admin/LoginAdmin';
import DashboardAdmin from './admin/DashboardAdmin';
import PilihProdiAdmin from './admin/PilihProdiAdmin';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login

  const hideNavbarRoutes = [
    // '/dataAlumni',
    // '/dataDosen',
    // '/dataIndustri',
    '/survei',
    '/terimakasih',
    // '/pilihProdi',
    '/dashboardAdmin',
    '/loginAdmin',
    '/pilihProdiAdmin'
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const isDashboardAdmin = location.pathname === '/dashboardAdmin';

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set status login ke true
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set status login ke false
  };

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {isDashboardAdmin && <NavbarAdmin isLoggedIn={isLoggedIn} onLogout={handleLogout} />} {/* Pass props untuk NavbarAdmin */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dataIndustri" element={<IsiDataIndustri />} />
        <Route path="/dataAlumni" element={<IsiDataAlumni />} />
        <Route path="/dataDosen" element={<IsiDataDosen />} />
        <Route path="/digramSurvey" element={<DiagramSurvey />} />
        <Route path="/survei" element={<Survei />} />
        <Route path="/terimakasih" element={<TerimakasihPage />} />
        <Route path="/tentang/*" element={<Tentang />} />
        <Route path="/pilihProdi" element={<PilihProdi />} />

        <Route 
          path="/loginAdmin" 
          element={<LoginAdmin onLoginSuccess={handleLoginSuccess} />} // Pass fungsi untuk login
        />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/pilihProdiAdmin" element={<PilihProdiAdmin />} />
      </Routes>

      <Footer /> 
    </>
  );
}

export default App;
