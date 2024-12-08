import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NavbarAdmin from "./components/NavbarAdmin";

// Pages Responden
import LandingPage from "./pages/Responden/LandingPage";
import IsiDataIndustri from "./pages/Responden/IsiDataIndustri";
import IsiDataAlumni from "./pages/Responden/IsiDataAlumni";
import IsiDataDosen from "./pages/Responden/IsiDataDosen";
import DiagramSurvey from "./pages/Responden/DiagramSurvey";
import Survei from "./pages/Responden/Survei";
import FinishPage from "./pages/Responden/FinishPage";
import PilihProdi from "./pages/Responden/PilihProdi";

// Pages Admin
import LoginAdmin from "./pages/Auth/LoginAdmin";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import QuestionAdmin from "./pages/Admin/QuestionAdmin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Responden Routes */}
        <Route path="/*" element={<MainLayout />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

// Layout untuk Responden
function MainLayout() {
  const location = useLocation();

  // Daftar route tanpa Navbar dan Footer
  const HIDE_NAVBAR_ROUTES = ["/survei", "/finish"];
  const HIDE_FOOTER_ROUTES = ["/industri", "/dosen", "/alumni", "/survei", "/finish", "/diagram"];

  const shouldShowNavbar = !HIDE_NAVBAR_ROUTES.includes(location.pathname);
  const shouldShowFooter = !HIDE_FOOTER_ROUTES.includes(location.pathname);

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

// Layout untuk Admin
function AdminLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Fungsi login dan logout
  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Redirect jika belum login dan mencoba mengakses halaman selain login
  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/admin/login") {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, location.pathname]);

  // Konfigurasi route admin
  const ADMIN_ROUTES = [
    { path: "/login", element: <LoginAdmin onLoginSuccess={handleLoginSuccess} /> },
    { path: "/dashboard", element: <DashboardAdmin /> },
    { path: "/question", element: <QuestionAdmin /> },
    { path: "/diagram", element: <DiagramSurvey /> },
  ];

  // Jika belum login, hanya tampilkan halaman login
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginAdmin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    );
  }

  // Layout untuk admin yang sudah login
  return (
    <>
      <NavbarAdmin isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {ADMIN_ROUTES.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;