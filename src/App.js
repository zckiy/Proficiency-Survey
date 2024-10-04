import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/Responden/LandingPage';
// import IsiDataIndustri from './pages/Responden/IsiDataIndustri';
// import IsiDataAlumni from './pages/Responden/IsiDataAlumni';
// import IsiDataDosen from './pages/Responden/IsiDataDosen';

import LoginAdmin from './admin/LoginAdmin'; 


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/*" element={<LandingPage />} /> */}
        {/* <Route path="/" element={<IsiDataIndustri />} /> */}
        {/* <Route path="/" element={<IsiDataAlumni />} /> */}
        {/* <Route path="/" element={<IsiDataDosen />} /> */}

        <Route path="/" element={<LoginAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
