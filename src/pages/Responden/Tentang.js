import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Halaman Tujuan 1
const Tujuan1 = () => (
  <motion.div 
    style={styles.pageContainer}
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2>Menilai Kecocokan Keterampilan</h2>
    <p>
      Aplikasi ini membantu menilai kecocokan antara keterampilan lulusan dengan kebutuhan industri, 
      untuk memastikan lulusan siap menghadapi dunia kerja.
    </p>
    {/* Perhatikan path Link yang benar */}
    <Link to="tujuan2" style={styles.navButton}>Lanjut ke Tujuan 2</Link>
  </motion.div>
);

// Halaman Tujuan 2
const Tujuan2 = () => (
  <motion.div 
    style={styles.pageContainer}
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2>Meningkatkan Kualitas Kurikulum</h2>
    <p>
      Melalui umpan balik dari alumni dan industri, aplikasi ini memberikan informasi penting untuk meningkatkan kualitas kurikulum di Politeknik Negeri Batam.
    </p>
    <Link to="tujuan3" style={styles.navButton}>Lanjut ke Tujuan 3</Link>
  </motion.div>
);

// Halaman Tujuan 3
const Tujuan3 = () => (
  <motion.div 
    style={styles.pageContainer}
    initial={{ opacity: 0, y: 200 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2>Membantu Dosen</h2>
    <p>
      Dosen dapat memahami kebutuhan kompetensi lulusan yang diharapkan oleh industri, sehingga dapat mengembangkan metode pengajaran yang lebih relevan.
    </p>
    <Link to="tujuan4" style={styles.navButton}>Lanjut ke Tujuan 4</Link>
  </motion.div>
);

// Halaman Tujuan 4
const Tujuan4 = () => (
  <motion.div 
    style={styles.pageContainer}
    initial={{ opacity: 0, y: -200 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2>Identifikasi Gap Keterampilan</h2>
    <p>
      Aplikasi ini juga mengidentifikasi gap antara keterampilan lulusan dengan harapan industri, membantu institusi untuk terus memperbaiki kualitas pendidikan.
    </p>
    <Link to="selesai" style={styles.navButton}>Selesai</Link>
  </motion.div>
);

// Halaman Selesai
const Selesai = () => (
  <motion.div 
    style={styles.pageContainer}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2>Terima Kasih Telah Membaca!</h2>
    <p>Anda telah memahami tujuan utama dari aplikasi ini. Jika ingin kembali ke halaman utama, klik tombol di bawah.</p>
    <Link to="/" style={styles.navButton}>Kembali ke Landing Page</Link>
  </motion.div>
);

// Routing untuk halaman Tentang
const Tentang = () => (
  <Routes>
    <Route path="/" element={<Tujuan1 />} />
    <Route path="tujuan2" element={<Tujuan2 />} />
    <Route path="tujuan3" element={<Tujuan3 />} />
    <Route path="tujuan4" element={<Tujuan4 />} />
    <Route path="selesai" element={<Selesai />} />
  </Routes>
);

// Styling inline untuk halaman
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #8ec5fc 0%, #e0c3fc 100%)',
    minHeight: '100vh',
    color: '#333',
    transition: 'all 0.5s ease',
  },
  navButton: {
    marginTop: '2rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
};

export default Tentang;
