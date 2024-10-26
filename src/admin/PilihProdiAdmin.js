import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PilihProdi = () => {
  const [selectedProdi, setSelectedProdi] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedProdi(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedProdi) {
      navigate('/survei');
    } else {
      alert('Silakan pilih jurusan terlebih dahulu!');
    }
  };

  const [isHovered, setIsHovered] = useState(false);


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Pilih Jurusan Survei</h2>
        <div style={styles.dropdownContainer}>
          <select
            id="prodi"
            value={selectedProdi}
            onChange={handleSelectChange}
            style={styles.dropdown}
          >
            <option value="">Pilih Jurusan</option>
            <option value="Teknik Informatika">TEKNIK INFORMATIKA</option>
            <option value="Teknik Elektro">TEKNIK ELEKTRO</option>
            <option value="Teknik Mesin">TEKNIK MESIN</option>
            <option value="Manajemen & Bisnis">MANAJEMEN & BISNIS</option>
          </select>
        </div>
        <button 
            style={isHovered ? { ...styles.submitBtn, ...styles.submitBtnHover } : styles.submitBtn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleSubmit}
            >
          Lanjutkan Survey
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '30px 40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  dropdownContainer: {
    marginBottom: '20px',
  },
  dropdown: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #4A90E2',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  submitBtn: {
    padding: '12px 20px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  submitBtnHover: {
    backgroundColor: '#357ABD',
  },
};

export default PilihProdi;
