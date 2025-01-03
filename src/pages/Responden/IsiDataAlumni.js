import React, { useState, useEffect, useRef } from 'react';
import {
    Container, Box, Typography, TextField, Button, CssBaseline, Select, MenuItem,
    FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Card, CardContent
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { insertResponden } from '../../api/RespondenAPI';
import { prodi } from '../../api/SurveiAPI';
import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha } from '../../api/CaptchAPI';

// Create a custom theme
const theme = createTheme({
    palette: {
        background: {
            default: '#E8F0FE',
        },
    },
});

function IsiDataAlumni() {
    const [prodiData, setProdiData] = useState([]);
    const [jurusanData, setJurusanData] = useState([]);
    const [filteredProdi, setFilteredProdi] = useState([]);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        tahunLulusan: "",
        prodiID: "",
        jurusanID: "",
    });
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const recaptchaRef = useRef();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "tahunLulusan" ? (value === "" ? "" : Number(value)) : value,
        }));
    };

    const handleCaptchaChange = async (value) => {
        if (value) {
            try {
                setIsVerifying(true);
                const result = await verifyCaptcha(value);
                if (result.success) {
                    setCaptchaVerified(true);
                    localStorage.setItem("captchaVerified", "true");
                } else {
                    alert("CAPTCHA verification failed. Please try again.");
                    setCaptchaVerified(false);
                    recaptchaRef.current.reset();
                }
            } catch (error) {
                console.error("CAPTCHA API Error:", error);
                alert("Unable to verify CAPTCHA. Please check your internet connection or try again later.");
                setCaptchaVerified(false);
                recaptchaRef.current.reset();
            } finally {
                setIsVerifying(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaVerified) {
            alert("Please complete CAPTCHA verification.");
            return;
        }

        setConfirmDialogOpen(false);
        try {
            const tipeResID = calculateTipeRes(Number(formData.tahunLulusan));
            const requestData = { ...formData, tipeResID };

            const respondenID = await insertResponden(requestData);
            console.log(respondenID);
            navigate("/prodi", { state: { respondenID: respondenID } });
        } catch (error) {
            console.error(error);
            alert("An error occurred: " + error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await prodi();
                setProdiData(data);
                const uniqueJurusan = [
                    ...new Map(
                        data.map((item) => [item.jurusanID, item.namaJurusan])
                    ),
                ].map(([jurusanID, namaJurusan]) => ({
                    jurusanID,
                    namaJurusan,
                }));

                setJurusanData(uniqueJurusan);
            } catch (error) {
                console.error('Error fetching prodi data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (formData.jurusanID) {
            const filtered = prodiData.filter(
                (item) => item.jurusanID === parseInt(formData.jurusanID)
            );
            setFilteredProdi(filtered);
        } else {
            setFilteredProdi([]);
        }
    }, [formData.jurusanID, prodiData]);

    const calculateTipeRes = (tahunLulusan) => {
        const currentYear = new Date().getFullYear();
        return currentYear - tahunLulusan < 5 ? 1 : 2;
    };

    if (captchaVerified === false) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Card sx={{ minWidth: 275, textAlign: 'center' }}>
                        <CardContent>
                            <Typography gutterBottom variant='h7' fontStyle={{ fontWeight: 'bold' }}>
                                Verify you are not a robot
                            </Typography>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6Lc4tawqAAAAAHa-bQtibnYP2BPhxBoKxE3BYyCT"
                                onChange={handleCaptchaChange}
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}
                            />
                        </CardContent>
                    </Card>
                </Box>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Box
                        sx={{
                            marginTop: '60px',
                            backgroundColor: '#fff',
                            padding: '30px',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                color: '#333',
                            }}
                        >
                            Data Diri
                        </Typography>
                        <TextField
                            label="Nama"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Tahun Kelulusan"
                            name="tahunLulusan"
                            value={formData.tahunLulusan}
                            onChange={handleChange}
                            type="number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel
                                id="jurusan-label"
                                shrink
                                sx={{
                                    backgroundColor: '#fff',
                                    padding: '0 4px',
                                    marginLeft: '-4px',
                                }}
                            >
                                Jurusan
                            </InputLabel>
                            <Select
                                labelId="jurusan-label"
                                id="jurusan"
                                name="jurusanID"
                                value={formData.jurusanID}
                                onChange={handleChange}
                                label=""
                            >
                                {jurusanData.map((jurusan) => (
                                    <MenuItem key={jurusan.jurusanID} value={jurusan.jurusanID}>
                                        {jurusan.namaJurusan}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel
                                id="prodi-label"
                                shrink
                                sx={{
                                    backgroundColor: '#fff',
                                    padding: '0 4px',
                                    marginLeft: '-4px',
                                }}
                            >
                                Program Studi
                            </InputLabel>
                            <Select
                                labelId="prodi-label"
                                id="prodi"
                                name="prodiID"
                                value={formData.prodiID}
                                onChange={handleChange}
                                disabled={!formData.jurusanID}
                                label="Pilih Prodi"
                            >
                                {filteredProdi.map((prodi) => (
                                    <MenuItem key={prodi.prodiID} value={prodi.prodiID}>
                                        {prodi.namaProdi}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: '100%',
                                    backgroundColor: captchaVerified ? '#577399' : '#b0bec5',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: captchaVerified ? '#4a6178' : '#b0bec5',
                                    },
                                }}
                                onClick={() => setConfirmDialogOpen(true)}
                                disabled={!captchaVerified || isVerifying}
                            >
                                {isVerifying ? "Memverifikasi..." : "Submit"}
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Confirm Dialog */}
                <Dialog
                    open={confirmDialogOpen}
                    onClose={() => setConfirmDialogOpen(false)}
                    aria-labelledby="confirm-dialog-title"
                    aria-describedby="confirm-dialog-description"
                >
                    <DialogTitle id="confirm-dialog-title">Konfirmasi</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-dialog-description">
                            Apakah Anda yakin ingin menyimpan jawaban?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDialogOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary" autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}

export default IsiDataAlumni;