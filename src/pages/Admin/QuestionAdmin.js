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
  IconButton,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid2";
import { pertanyaan, survei, pertanyaanDetail } from "../../api/SurveiAPI";
import SelectionBox from '../Responden/SelectionBox';
import { prodi } from '../../api/SurveiAPI';
import { insertPertanyaan, insertPertanyaanDet } from '../../api/QuestionAPI';
import { Add, Remove, BuildCircle, AddCircle } from '@mui/icons-material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  px: 4,
  pb: 4,
  pt: 2
};

function QuestionAdmin() {
  const [surveiList, setSurvei] = useState([]);
  const [pertanyaanList, setPertanyaan] = useState([]);
  const [pertanyaanDetList, setPertanyaanDet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProdiID, setSelectedProdiID] = useState(1);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [edit, setEdit] = useState(false);
  const [prodiData, setProdiData] = useState([]);
  const [pertanyaanID, setPertanyaanID] = useState(null);
  const [selectedPertanyaan, setSelectedPertanyaan] = useState(null); // State untuk pertanyaan yang dipilih

  const currentSurvei = surveiList[currentPage - 1];
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    kodePertanyaan: '',
    pertanyaan: '',
    setAll: false,
  });

  const [details, setDetails] = useState([
    { kodePertanyaanDetail: '', pertanyaanDetail: '' },
  ]);

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

      const prodiData = await prodi();
      setProdiData(prodiData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedProdiID]);

  useEffect(() => {
    if (currentSurvei?.surveiID) {
      setFormData((prev) => ({
        ...prev,
        surveiID: currentSurvei.surveiID,
        prodiID: selectedProdiID
      }));
    }
  }, [currentSurvei, selectedProdiID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "surveiID" || name === "prodiID" ? parseInt(value, 10) : value,
    }));
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...details];
    updatedDetails[index][name] = value;
    setDetails(updatedDetails);
  };

  const addDetailRow = () => {
    setDetails([...details, { kodePertanyaanDetail: '', pertanyaanDetail: '' }]);
  };

  const removeDetailRow = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const isPertanyaanValid = formData.pertanyaan.trim() !== '';

  const handleSubmit = async () => {
    if (!isPertanyaanValid) {
      setError('Pertanyaan utama harus diisi terlebih dahulu.');
      return;
    }

    setError('');
    try {
      const responseInsert = await insertPertanyaan(formData);

      if (responseInsert?.data?.insertId) {
        setPertanyaanID(responseInsert.data.insertId);

        const detailsWithPertanyaanID = details.map((detail) => ({
          ...detail,
          pertanyaanID: responseInsert.data.insertId,
        }));

        const responseInsertDetail = await insertPertanyaanDet(detailsWithPertanyaanID);

        alert('Data berhasil dikirim: ' + JSON.stringify(responseInsertDetail.data));
      } else {
        throw new Error('Gagal mendapatkan ID pertanyaan.');
      }

      fetchData();
      handleClose();
    } catch (error) {
      setError('Gagal mengirim data: ' + error.message);
    }
  };

  const handleSubmitDetail = async () => {

    setError('');
    try {
      const detailsWithPertanyaanID = details.map((detail) => ({
        ...detail,
        pertanyaanID: selectedPertanyaan.pertanyaanID,
      }));

      const responseInsertDetail = await insertPertanyaanDet(detailsWithPertanyaanID);

      alert('Data berhasil dikirim: ' + JSON.stringify(responseInsertDetail.data));

      fetchData();
      handleClose();
    } catch (error) {
      setError('Gagal mengirim data: ' + error.message);
    }
  };

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
              <Grid container spacing={1}>
                <Grid size={{ xs: 10, md: 11 }}>
                  <Card sx={{ mt: 4, borderRadius: 2 }}>
                    <CardHeader
                      title={currentSurvei.judul}
                      titleTypographyProps={{ variant: "h6", textAlign: "center" }}
                      sx={{ backgroundColor: "#5B99C2", color: "white" }}
                    />
                  </Card>
                </Grid>
                <Grid size={{ xs: 2, md: 1 }}>
                  <List sx={{ display: 'flow-root', mt: 3 }}>
                    <ListItem sx={{ py: 0 }}>
                      <IconButton onClick={() => setOpen(true)} color="primary" sx={{ py: 0 }}>
                        <AddCircle />
                      </IconButton>
                    </ListItem>
                    <ListItem sx={{ py: 0, mt: 1 }}>
                      <IconButton onClick={() => setEdit(true)} color="warning" sx={{ py: 0 }}>
                        <BuildCircle />
                      </IconButton>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              {/* Modal untuk menambah pertanyaan */}
              <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Tambah Pertanyaan
                  </Typography>
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
                      disabled
                      labelId="prodi-label"
                      id="prodi"
                      name="prodiID"
                      label="Pilih Prodi"
                      value={selectedProdiID}
                    >
                      {prodiData.map((prodi) => (
                        <MenuItem key={prodi.prodiID} value={prodi.prodiID}>
                          {prodi.namaProdi}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <input
                    type="hidden"
                    name="SurveiID"
                    value={currentSurvei.surveiID}
                  />
                  <TextField
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label="Kode Pertanyaan"
                    name="kodePertanyaan"
                    value={formData.kodePertanyaan}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label="Pertanyaan"
                    name="pertanyaan"
                    value={formData.pertanyaan}
                    onChange={handleInputChange}
                    error={!isPertanyaanValid}
                    helperText={!isPertanyaanValid ? 'Pertanyaan utama wajib diisi.' : ''}
                    multiline
                    rows={4}
                  />

                  {error && (
                    <Grid item xs={12}>
                      <Typography color="error">{error}</Typography>
                    </Grid>
                  )}

                  {/* Form untuk Insert Detail */}
                  <Grid size={12} sx={{ mt: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Tambah Detail Pertanyaan
                    </Typography>
                    {details.map((detail, index) => (
                      <Grid container spacing={1} key={index} sx={{ mt: 2 }}>
                        <input
                          type="hidden"
                          name="pertanyaanID"
                          value={pertanyaanID}
                          disabled
                        />
                        <Grid size={2}>
                          <TextField
                            fullWidth
                            label="Kode Detail"
                            name="kodePertanyaanDetail"
                            value={detail.kodePertanyaanDetail}
                            onChange={(e) => handleDetailChange(index, e)}
                            disabled={!isPertanyaanValid}
                          />
                        </Grid>
                        <Grid size={9}>
                          <TextField
                            fullWidth
                            label="Pertanyaan"
                            name="pertanyaanDetail"
                            value={detail.pertanyaanDetail}
                            onChange={(e) => handleDetailChange(index, e)}
                            disabled={!isPertanyaanValid}
                            multiline
                            rows={4}
                          />
                        </Grid>
                        <Grid item xs={1} textAlign="right">
                          <IconButton onClick={() => removeDetailRow(index)} color="error">
                            <Remove />
                          </IconButton>
                          {index === details.length - 1 && (
                            <IconButton onClick={addDetailRow} color="primary">
                              <Add />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item xs={12} mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={!isPertanyaanValid}
                    >
                      Simpan Data
                    </Button>
                  </Grid>
                </Box>
              </Modal>

              {/* Modal untuk detail pertanyaan */}
              <Modal open={openDetail} onClose={() => setOpenDetail(false)}>
                <Box sx={modalStyle}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Tambah Detail Pertanyaan
                  </Typography>
                  {details.map((detail, index) => (
                    <Grid container spacing={1} key={index} sx={{ mt: 2 }}>
                      <input
                        type="hidden"
                        name="pertanyaanID"
                        value={selectedPertanyaan?.pertanyaanID || ''}
                        disabled
                      />
                      <Grid size={2}>
                        <TextField
                          fullWidth
                          label="Kode Detail"
                          name="kodePertanyaanDetail"
                          value={detail.kodePertanyaanDetail}
                          onChange={(e) => handleDetailChange(index, e)}
                        />
                      </Grid>
                      <Grid size={9}>
                        <TextField
                          fullWidth
                          label="Pertanyaan"
                          name="pertanyaanDetail"
                          value={detail.pertanyaanDetail}
                          onChange={(e) => handleDetailChange(index, e)}
                          multiline
                          rows={4}
                        />
                      </Grid>
                      <Grid size={1} textAlign="right">
                        <IconButton onClick={() => removeDetailRow(index)} color="error">
                          <Remove />
                        </IconButton>
                        {index === details.length - 1 && (
                          <IconButton onClick={addDetailRow} color="primary">
                            <Add />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                  <Grid size={12} mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmitDetail}
                    >
                      Simpan Data
                    </Button>
                  </Grid>
                </Box>
              </Modal>

              {pertanyaanList
                .filter((p) => p.surveiID === currentSurvei.surveiID)
                .map((pertanyaanData) => (
                  <Box key={pertanyaanData.pertanyaanID} sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                      <Grid size={11}>
                        <Card sx={{ borderRadius: 2 }}>
                          <CardHeader
                            title={`${pertanyaanData.kodePertanyaan}. ${pertanyaanData.pertanyaan}`}
                            sx={{ backgroundColor: "#577399", color: "white" }}
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              Please rate the level of student skills required.
                            </Typography>
                            <RadioGroup sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} row>
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
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid size={11}>
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
                      </Grid>
                      <Grid size={1}>
                        <List sx={{ display: 'flow-root', mt: 3 }}>
                          <ListItem sx={{ py: 0 }}>
                            <IconButton onClick={() => { setSelectedPertanyaan(pertanyaanData); setOpenDetail(true); }} color="primary" sx={{ py: 0 }}>
                              <AddCircle />
                            </IconButton>
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
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
    </Container >
  );
}

export default QuestionAdmin;