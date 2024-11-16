import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    CssBaseline,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,    
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { insertResponden } from '../../api/RespondenAPI';
import { prodi } from '../../api/SurveiAPI';

// Create a custom theme
const theme = createTheme({
    palette: {
        background: {
            default: '#E8F0FE',
        },
    },
});

function IsiDataDosen() {
    const [prodiData, setProdiData] = useState([]);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        tahunLulusan: "",
        prodiID: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "tahunLulusan" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        setConfirmDialogOpen(false);
        e.preventDefault();
        try {
            const tipeRes = 3;
            const tahunLulusan = null;
            const requestData = { ...formData, tipeRes, tahunLulusan };

            const respondenID = await insertResponden(requestData);
            console.log(respondenID);
            navigate("/prodi", { state: { respondenID: respondenID } });
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan: " + error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await prodi();
                setProdiData(data);
            } catch (error) {
                console.error('Error fetching prodi data:', error);
            }
        };

        fetchData();
    }, []);


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
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <InputLabel id="prodi-label">Program Studi</InputLabel>
                            <Select
                                labelId="prodi-label"
                                id="prodi"
                                name="prodiID"
                                value={formData.prodiID}
                                onChange={(e) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        prodiID: e.target.value,
                                    }))
                                }
                                label="Pilih Prodi"
                            >
                                {prodiData.map((prodi) => (
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
                                    backgroundColor: '#577399',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#4a6178',
                                    },
                                }}
                                onClick={() => setConfirmDialogOpen(true)}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>

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

export default IsiDataDosen;