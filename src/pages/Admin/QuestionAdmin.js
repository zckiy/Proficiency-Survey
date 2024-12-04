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
  Pagination,
  Modal,
  IconButton
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid2";
import { useNavigate, useLocation } from "react-router-dom";
import { pertanyaan, survei, pertanyaanDetail } from "../../api/SurveiAPI";
import SelectionBox from '../Responden/SelectionBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DashboardAdmin() {
  const [surveiList, setSurvei] = useState([]);
  const [pertanyaanList, setPertanyaan] = useState([]);
  const [pertanyaanDetList, setPertanyaanDet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProdiID, setSelectedProdiID] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surveiData = await survei();
        setSurvei(surveiData);

        const allPertanyaan = await Promise.all(
          surveiData.map(async (surveiItem) => {
            const pertanyaanData = await pertanyaan(surveiItem.surveiID, selectedProdiID);
            return { surveiID: surveiItem.surveiID, pertanyaan: pertanyaanData };
          })
        );

        setPertanyaan(allPertanyaan.flatMap((item) => item.pertanyaan));

        const allPertanyaanDet = await Promise.all(
          allPertanyaan.flatMap((item) =>
            item.pertanyaan.map(async (pertanyaanItem) => {
              const detailData = await pertanyaanDetail(pertanyaanItem.pertanyaanID);
              return { pertanyaanID: pertanyaanItem.pertanyaanID, detail: detailData };
            })
          )
        );

        setPertanyaanDet(allPertanyaanDet);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProdiID]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProgramChange = (programID) => {
    setSelectedProdiID(programID);
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
        <SelectionBox onProgramChange={handleProgramChange} />
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
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 10, md: 11 }}>
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
                            >
                              {[0, 1, 2, 3, 4, 5].map((value) => (
                                <FormControlLabel
                                  disabled
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
                      </Grid>
                      <Grid size={{ xs: 2, md: 1 }}>
                        <IconButton onClick={handleOpen} color="primary">
                          <AddCircleIcon/>
                        </IconButton>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                          </Box>
                        </Modal>
                      </Grid>
                    </Grid>
                    <Card sx={{ mt: 2, borderRadius: 2 }}>
                      <CardContent>
                        <TextField
                          fullWidth
                          label="Optional: Add short explanation"
                          variant="standard"
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
                                        disabled
                                        value={value || 2}
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
    </Container>
  );
}

export default DashboardAdmin;