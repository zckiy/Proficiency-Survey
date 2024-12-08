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
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const location = useLocation();

  // Logout logic
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, [location.pathname]); // Memeriksa setiap kali lokasi berubah.

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginAdmin onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    );
  }

  return (
    <>
      <NavbarAdmin isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/question" element={<QuestionAdmin />} />
        <Route path="/diagram" element={<DiagramSurvey />} />
      </Routes>
    </>
  );
}


export default App;