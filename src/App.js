import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/Responden/LandingPage';
import IsiDataIndustri from './pages/Responden/IsiDataIndustri';
import IsiDataAlumni from './pages/Responden/IsiDataAlumni';
import IsiDataDosen from './pages/Responden/IsiDataDosen';
import DiagramSurvey from './pages/Responden/DiagramSurvey';
import Survei from './pages/Responden/Survei';
import FinishPage from './pages/Responden/FinishPage';
import PilihProdi from './pages/Responden/PilihProdi';

import NavbarAdmin from './components/NavbarAdmin';
import LoginAdmin from './admin/LoginAdmin';
import DashboardAdmin from './admin/DashboardAdmin';
import PilihProdiAdmin from './admin/PilihProdiAdmin';
import QuestionAdmin from './admin/QuestionAdmin';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const hideNavbarRoutes = [
    '/survei',
    '/finish',
    '/dashboardAdmin',
    '/loginAdmin',
    '/pilihProdiAdmin'
  ];

  const hideFooterRoutes = [
    '/industri',
    '/dosen',
    '/alumni',
    '/survei',
    '/finish',
    '/dashboardAdmin',
    '/loginAdmin',
    '/pilihProdiAdmin',
    '/survei/:prodiID',
    '/prodi',
    '/diagram',
    '/questionAdmin'
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const shouldShowFooter = !hideFooterRoutes.some((route) =>
    matchPath(route, location.pathname)
  );
  const isDashboardAdmin = location.pathname === '/dashboardAdmin';

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {isDashboardAdmin && <NavbarAdmin isLoggedIn={isLoggedIn} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/industri" element={<IsiDataIndustri />} />
        <Route path="/alumni" element={<IsiDataAlumni />} />
        <Route path="/dosen" element={<IsiDataDosen />} />
        <Route path="/diagram" element={<DiagramSurvey />} />
        <Route path="/survei/:prodiID" element={<Survei />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/prodi" element={<PilihProdi />} />

        <Route
          path="/loginAdmin"
          element={<LoginAdmin onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/pilihProdiAdmin" element={<PilihProdiAdmin />} />
        <Route path="/questionAdmin" element={<QuestionAdmin />} /> 
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
