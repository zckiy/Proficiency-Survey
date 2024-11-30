import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Pagination
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid2";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { pertanyaan, survei, pertanyaanDetail, insertJawaban, insertJawabanDet } from "../../api/SurveiAPI";

function Survei() {
    const navigate = useNavigate();
    const location = useLocation();
    const { prodiID } = useParams();

    const [surveiList, setSurvei] = useState([]);
    const [pertanyaanList, setPertanyaan] = useState([]);
    const [pertanyaanDetList, setPertanyaanDet] = useState([]);
    const [formJawaban, setFormJawaban] = useState({});
    const [formJawabanDet, setFormJawabanDet] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { respondenID } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveiData = await survei();
                setSurvei(surveiData);

                const allPertanyaan = await Promise.all(
                    surveiData.map(async (surveiItem) => {
                        const pertanyaanData = await pertanyaan(surveiItem.surveiID, prodiID);
                        return { surveiID: surveiItem.surveiID, pertanyaan: pertanyaanData };
                    })
                );

                setPertanyaan(allPertanyaan.flatMap((item) => item.pertanyaan));

                const initialJawaban = {};
                allPertanyaan.flatMap((item) => item.pertanyaan).forEach((pertanyaan) => {
                    initialJawaban[pertanyaan.pertanyaanID] = { jawabanNUM: 0, jawabanSTR: "" };
                });
                setFormJawaban(initialJawaban);

                const allPertanyaanDet = await Promise.all(
                    allPertanyaan.flatMap((item) =>
                        item.pertanyaan.map(async (pertanyaanItem) => {
                            const detailData = await pertanyaanDetail(pertanyaanItem.pertanyaanID);
                            return { pertanyaanID: pertanyaanItem.pertanyaanID, detail: detailData };
                        })
                    )
                );

                setPertanyaanDet(allPertanyaanDet);

                const initialJawabanDet = {};
                allPertanyaanDet.forEach((item) => {
                    item.detail.forEach((det) => {
                        initialJawabanDet[det.pertanyaanDetID] = { pertanyaanID: det.pertanyaanID, jawabanDet: 2 };
                    });
                });
                setFormJawabanDet(initialJawabanDet);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [prodiID]);

    const handleJawabanChange = (pertanyaanID, pertanyaanDetID, name, value) => {
        if (name === "jawabanNUM" || name === "jawabanSTR") {
            setFormJawaban((prev) => ({
                ...prev,
                [pertanyaanID]: {
                    ...prev[pertanyaanID],
                    [name]: name === "jawabanNUM" ? Number(value) : value,
                },
            }));
        }

        if (name === "jawabanDet") {
            setFormJawabanDet((prev) => ({
                ...prev,
                [pertanyaanDetID]: {
                    ...prev[pertanyaanDetID],
                    pertanyaanID: Number(pertanyaanID),
                    [name]: Number(value),
                },
            }));
        }
    };

    const handleSubmit = async (e) => {
        setConfirmDialogOpen(false);
        e.preventDefault();
        try {
            const jawaban = Object.entries(formJawaban).map(([pertanyaanID, answers]) => ({
                respondenID: respondenID.respondenID,
                prodiID: prodiID,
                pertanyaanID: Number(pertanyaanID),
                jawabanNUM: answers.jawabanNUM ?? 0,
                jawabanSTR: answers.jawabanSTR || "",
            }));

            const jawabanDet = Object.entries(formJawabanDet).map(([pertanyaanDetID, detail]) => ({
                pertanyaanDetID: Number(pertanyaanDetID),
                prodiID: prodiID,
                respondenID: Number(respondenID.respondenID),
                jawabanDet: Number(detail.jawabanDet ?? 2),
            }));

            await insertJawaban(jawaban);
            await insertJawabanDet(jawabanDet);

            setSuccessDialogOpen(true);

            navigate("/finish");
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan: " + error.message);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const currentSurvei = surveiList[currentPage - 1];

    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                fontFamily: 'Arial, sans-serif',
                marginTop: 8
            }}>
                <Box sx={{ width: '80%' }}>
                    {currentSurvei && (
                        <Box>
                            <Card sx={{ mt: 4, borderRadius: 2 }}>
                                <CardHeader
                                    title={currentSurvei.judul}
                                    titleTypographyProps={{ variant: "h6", textAlign: "center" }}
                                    sx={{ backgroundColor: "#5B99C2", color: "white" }}
                                />
                            </Card>
                            {pertanyaanList
                                .filter((p) => p.surveiID === currentSurvei.surveiID)
                                .map((pertanyaanData) => (
                                    <Box key={pertanyaanData.pertanyaanID} sx={{ mt: 2 }}>
                                        <Card sx={{ borderRadius: 2 }}>
                                            <CardHeader
                                                title={`${pertanyaanData.kodePertanyaan}. ${pertanyaanData.pertanyaan}`}
                                                sx={{ backgroundColor: "#577399", color: "white" }}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    Please rate the level of student skills required.
                                                </Typography>
                                                <RadioGroup sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                                                    row
                                                    value={formJawaban[pertanyaanData.pertanyaanID]?.jawabanNUM || 0}
                                                    onChange={(e) =>
                                                        handleJawabanChange(pertanyaanData.pertanyaanID, null, "jawabanNUM", e.target.value)
                                                    }
                                                >
                                                    {[0, 1, 2, 3, 4, 5].map((value) => (
                                                        <FormControlLabel
                                                            key={value}
                                                            value={Number(value)}
                                                            control={<Radio />}
                                                            label={Number(value)}
                                                            labelPlacement="top"
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </CardContent>
                                        </Card>

                                        <Card sx={{ mt: 2, borderRadius: 2 }}>
                                            <CardContent>
                                                <TextField
                                                    fullWidth
                                                    label="Optional: Add short explanation"
                                                    variant="standard"
                                                    value={formJawaban[pertanyaanData.pertanyaanID]?.jawabanSTR || ""}
                                                    onChange={(e) =>
                                                        handleJawabanChange(pertanyaanData.pertanyaanID, null, "jawabanSTR", e.target.value)
                                                    }
                                                />
                                            </CardContent>
                                        </Card>

                                        <Card sx={{ width: '100%', mt: 2, borderRadius: 3 }}>
                                            <CardContent sx={{ px: 3 }}>
                                                <Typography gutterBottom sx={{ color: 'text.dark', fontSize: 16, mb: 4 }}>
                                                    Choose one or two major required skills for the jobs
                                                </Typography>
                                                <Box>
                                                    <Grid container spacing={1} columns={38} fullWidth>
                                                        <Grid size={1.5}>
                                                        </Grid>
                                                        <Grid size={15}>
                                                        </Grid>
                                                        <Grid size={7} textAlign={'center'}>
                                                            - (lower)
                                                        </Grid>
                                                        <Grid size={7} textAlign={'center'}>
                                                            0 (normal)
                                                        </Grid>
                                                        <Grid size={7} textAlign={'center'}>
                                                            + (higher)
                                                        </Grid>
                                                    </Grid>
                                                    {pertanyaanDetList
                                                        .find((p) => p.pertanyaanID === pertanyaanData.pertanyaanID)
                                                        ?.detail.map((pertanyaanDetData) => (
                                                            <React.Fragment key={pertanyaanDetData.pertanyaanDetID}>
                                                                <Grid container spacing={1} columns={38} sx={{ backgroundColor: grey[100], mt: 1 }} fullWidth>
                                                                    <Grid size={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Typography sx={{ ml: 1 }}>
                                                                            {pertanyaanDetData.kodePertanyaanDetail}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid size={15} sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Typography sx={{ ml: 1 }}>
                                                                            {pertanyaanDetData.pertanyaanDetail}
                                                                        </Typography>
                                                                    </Grid>
                                                                    {[1, 2, 3].map((value) => (
                                                                        <Grid size={7} textAlign={'center'} key={value}>
                                                                            <Radio
                                                                                value={value || 2}
                                                                                checked={
                                                                                    (formJawabanDet[pertanyaanDetData.pertanyaanDetID]?.jawabanDet ?? 2) === value
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleJawabanChange(
                                                                                        pertanyaanData.pertanyaanID,
                                                                                        pertanyaanDetData.pertanyaanDetID,
                                                                                        "jawabanDet",
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                                name={`pertanyaanDet-${pertanyaanDetData.pertanyaanDetID}`}
                                                                                inputProps={{ 'aria-label': value }}
                                                                            />
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>
                                                            </React.Fragment>
                                                        ))}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ))}
                        </Box>
                    )}
                    {currentPage === surveiList.length && (
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Button type="submit" variant="contained" onClick={() => setConfirmDialogOpen(true)}>
                                Submit
                            </Button>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                        <Pagination
                            count={surveiList.length}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{ mt: 2 }}
                            color="primary"
                        />
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

            <Dialog
                open={successDialogOpen}
                onClose={() => setSuccessDialogOpen(false)}
                aria-labelledby="success-dialog-title"
                aria-describedby="success-dialog-description"
            >
                <DialogTitle id="success-dialog-title">{"Berhasil"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="success-dialog-description">
                        Jawaban berhasil disimpan!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessDialogOpen(false)} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Survei;