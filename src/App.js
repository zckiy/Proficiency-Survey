// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/Responden/LandingPage';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
