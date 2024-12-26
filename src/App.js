import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NavbarAdmin from "./components/NavbarAdmin";

import LandingPage from "./pages/Responden/LandingPage";
import IsiDataIndustri from "./pages/Responden/IsiDataIndustri";
import IsiDataAlumni from "./pages/Responden/IsiDataAlumni";
import IsiDataDosen from "./pages/Responden/IsiDataDosen";
import DiagramSurvey from "./pages/Responden/DiagramSurvey";
import Survei from "./pages/Responden/Survei";
import FinishPage from "./pages/Responden/FinishPage";
import PilihProdi from "./pages/Responden/PilihProdi";

import LoginAdmin from "./pages/Auth/LoginAdmin";
import QuestionAdmin from "./pages/Admin/QuestionAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainLayout />} />

        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

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

function AdminLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, [location.pathname]); 

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginAdmin onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <>
      <NavbarAdmin isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/question" element={<QuestionAdmin />} />
        <Route path="/diagram" element={<DiagramSurvey />} />
      </Routes>
    </>
  );
}

export default App;