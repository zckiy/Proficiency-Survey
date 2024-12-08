import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchPath, Navigate } from 'react-router-dom';
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
import LoginAdmin from './pages/Auth/LoginAdmin';
import QuestionAdmin from './pages/Admin/QuestionAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
} 
  
function Main() {
  const location = useLocation();
  const hideNavbarRoutes = ['/survei', '/finish'];
  const hideFooterRoutes = ['/industri', '/dosen', '/alumni', '/survei', '/finish', '/diagram'];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const shouldShowFooter = !hideFooterRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/industri" element={<IsiDataIndustri />} />
        <Route path="/alumni" element={<IsiDataAlumni />} />
        <Route path="/dosen" element={<IsiDataDosen />} />
        <Route path="/diagram" element={<DiagramSurvey />} />
        <Route path="/survei/:prodiID" element={<Survei />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/prodi" element={<PilihProdi />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

function AdminLayout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/admin/login') {
      setIsLoggedIn(false);
    }
  }, [location.pathname, isLoggedIn]);


  const adminRoutes = [
    { path: '/login', element: <LoginAdmin onLoginSuccess={handleLoginSuccess} /> },
    { path: '/question', element: <QuestionAdmin /> },
    { path: '/diagram', element: <DiagramSurvey /> }
  ];

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginAdmin onLoginSuccess={handleLoginSuccess} />} />
        {/* Redirect jika mencoba mengakses halaman tanpa autentikasi */}
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    );
  }
  return (
    <>
      <NavbarAdmin isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;