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
        <h2 style={styles.title}>Pilih Program Studi</h2>
        <div style={styles.dropdownContainer}>
          <select
            id="prodi"
            value={selectedProdi}
            onChange={handleSelectChange}
            style={styles.dropdown}
          >
            <option value="">-- Pilih Prodi --</option>
            <option value="Teknik Informatika">TEKNIK INFORMATIKA</option>
            <option value="Teknik Geomatika">TEKNIK GEOMATIKA</option>
            <option value="Animasi">ANIMASI</option>
            <option value="Teknologi Rekayasa Multimedia">TEKNOLOGI REKAYASA MULTIMEDIA</option>
            <option value="Rekayasa Keamanan Siber">REKAYASA KEAMANAN SIBER</option>
            <option value="Rekayasa Perangkat Lunak">REKAYASA PERANGKAT LUNAK</option>
            <option value="Teknik Komputer">TEKNIK KOMPUTER</option>
            <option value="Teknologi Permainan">TEKNOLOGI PERMAINAN</option>

            <option value="Teknik Elektronika Manufaktur">TEKNIK ELEKTRONIKA MANUFAKTUR</option>
            <option value="Teknologi Rekayasa Elektronika">TEKNOLOGI REKAYASA ELEKTRONIKA</option>
            <option value="Teknik Instrumentasi">TEKNIK INSTRUMENTASI</option>
            <option value="Teknik Mekatronika">TEKNIK MEKATRONIKA</option>
            <option value="Teknologi Rekayasa Pembangkit Energi">TEKNOLOGI REKAYASA PEMBANGKIT ENERGI</option>
            <option value="Teknologi Rekayasa Robotika">TEKNOLOGI REKAYASA ROBOTIKA</option>

            <option value="Teknik Mesin">TEKNIK MESIN</option>
            <option value="Teknik Perawatan Pesawat Udara">TEKNIK PERAWATAN PESAWAT UDARA</option>
            <option value="Teknologi Rekayasa Konstruksi Perkapalan">TEKNOLOGI REKAYASA KONSTRUKSI PERKAPALAN</option>
            <option value="Teknologi Rekayasa Pengelasan dan Fabrikasi">TEKNOLOGI REKAYASA PENGELASAN DAN FABRIKASI</option>
            <option value="Program Profesi Insinyur">PROGRAM PROFESI INSINYUR</option>
            <option value="Teknologi Rekayasa Metalurgi">TEKNOLOGI REKAYASA METALURGI</option>

            <option value="Akuntansi">AKUNTANSI</option>
            <option value="Akuntansi Manajerial">AKUNTANSI MANAJERIAL</option>
            <option value="Administrasi Bisnis Terapan">ADMINISTRASI BISNIS TERAPAN</option>
            <option value="Logistik Perdagangan Internasional">LOGISTIK PERDAGANGAN INTERNASIONAL</option>
            <option value="Jalur Cepat Distribusi Barang">JALUR CEPAT DISTRIBUSI BARANG</option>
          </select>
        </div>
        <button
          style={isHovered ? { ...styles.submitBtn, ...styles.submitBtnHover } : styles.submitBtn}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleSubmit}
        >
          Lanjut
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
    height: '75vh',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '40px 90px',
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
    marginBottom: '25px',
  },
  dropdown: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    border: '2px solid #4A90E2',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  submitBtn: {
    padding: '15px 38px',
    backgroundColor: '#577399',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  submitBtnHover: {
    backgroundColor: '#577399',
  },
};

export default PilihProdi;
