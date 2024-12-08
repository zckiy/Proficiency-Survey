import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
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
  AppBar,
  Tabs,
  Tab,
  Checkbox
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid2";
import { useNavigate, useLocation } from "react-router-dom";
import { pertanyaan, survei, pertanyaanDetail } from "../../api/SurveiAPI";
import SelectionBox from '../Responden/SelectionBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { prodi } from '../../api/SurveiAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  px: 4,
  pb: 4,
  pt: 2
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function QuestionAdmin() {
  const [surveiList, setSurvei] = useState([]);
  const [pertanyaanList, setPertanyaan] = useState([]);
  const [pertanyaanDetList, setPertanyaanDet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProdiID, setSelectedProdiID] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [prodiData, setProdiData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

        const prodiData = await prodi();
        setProdiData(prodiData);
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
                      <IconButton onClick={handleOpen} color="primary" sx={{ py: 0 }}>
                        <AddCircleIcon />
                      </IconButton>
                    </ListItem>
                    <ListItem sx={{ py: 0 }}>
                      <IconButton onClick={handleOpen} color="success" sx={{ py: 0, mt: 1 }}>
                        <BuildCircleIcon />
                      </IconButton>
                    </ListItem>
                  </List>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                        <AppBar position="static">
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            sx={{ bgcolor: '#577399' }}
                          >
                            <Tab label="Header" {...a11yProps(0)} />
                            <Tab label="Detail" {...a11yProps(1)} />
                          </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Question
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
                          <TextField
                            label="Kode Pertanyaan"
                            name="kodePertanyaan"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            sx={{ mt: 3 }}
                          />
                          <TextField
                            label="Question"
                            name="pertanyaan"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                          />
                          <FormControlLabel control={<Checkbox defaultChecked />} label="Set All" />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Question Detail
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
                          <TextField
                            label="Kode Pertanyaan"
                            name="kodePertanyaan"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            sx={{ mt: 3 }}
                          />
                          <TextField
                            label="Question"
                            name="pertanyaan"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                          />
                        </TabPanel>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            width: '95%',
                            backgroundColor: '#577399',
                            textTransform: 'none',
                            '&:hover': {
                              backgroundColor: '#4a6178',
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Grid>
              </Grid>
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
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 10, md: 11 }}>
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
    </Container>
  );
}

export default QuestionAdmin;