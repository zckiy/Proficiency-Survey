import * as React from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    TextField
} from '@mui/material';
import { Container } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';
//import { useNavigate } from 'react-router-dom';
import { pertanyaan, survei, pertanyaanDetail } from '../../api/SurveiAPI';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';

function Survei() { // Capitalized name
    // const navigate = useNavigate();
    const { prodiID } = useParams();
    const [surveiList, setSurvei] = useState([]);
    const [pertanyaanList, setPertanyaan] = useState([]);
    const [pertanyaanDetList, setPertanyaanDet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedValue, setSelectedValue] = useState('b');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveiData = await survei();
                //console.log('Survei Data:', surveiData); // Debug log
                setSurvei(surveiData);

                const allPertanyaan = await Promise.all(
                    surveiData.map(async (surveiItem) => {
                        const pertanyaanData = await pertanyaan(surveiItem.surveiID, prodiID);
                        //console.log(`Pertanyaan Data for Survei ${surveiItem.surveiID}:`, pertanyaanData); // Debug log
                        return { surveiID: surveiItem.surveiID, pertanyaan: pertanyaanData };
                    })
                );

                setPertanyaan(allPertanyaan.flatMap(item => item.pertanyaan));

                const allPertanyaanDet = await Promise.all(
                    allPertanyaan.flatMap((item) =>
                        item.pertanyaan.map(async (pertanyaanItem) => {
                            const pertanyaanDetData = await pertanyaanDetail(pertanyaanItem.pertanyaanID);
                            //console.log(`Pertanyaan Detail for Pertanyaan ${pertanyaanItem.pertanyaanID}:`, pertanyaanDetData); // Debug log
                            return { pertanyaanID: pertanyaanItem.pertanyaanID, detail: pertanyaanDetData };
                        })
                    )
                );

                setPertanyaanDet(allPertanyaanDet);

            } catch (err) {
                console.error('Error fetching data:', err); // Log error
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [prodiID]);

    return (

        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                fontFamily: 'Arial, sans-serif',
                marginTop: 15
            }}>
                <Box>
                    {surveiList.map((surveiData) => (
                        <React.Fragment key={surveiData.surveiID}>
                            <Card sx={{ width: 1000, mt: 5, borderRadius: 3 }}>
                                <CardHeader
                                    sx={{ backgroundColor: '#5B99C2' }}
                                    titleTypographyProps={{ sx: { color: 'white', fontSize: '20px', fontWeight: 'bold' } }}
                                    title={surveiData.kode + ". " + surveiData.judul}
                                />
                            </Card>
                            {pertanyaanList.filter(p => p.surveiID === surveiData.surveiID).map((pertanyaanData) => (
                                <React.Fragment key={pertanyaanData.pertanyaanId}>
                                    <Card sx={{ width: 1000, mt: 2, borderRadius: 3 }}>
                                        <CardHeader
                                            sx={{ backgroundColor: '#577399' }}
                                            titleTypographyProps={{ sx : { color: 'white', fontSize: 18 } }}
                                            title={pertanyaanData.kodePertanyaan + ". " + pertanyaanData.pertanyaan}
                                        />
                                        <CardContent sx={{ px: 3 }}>
                                            <Typography gutterBottom sx={{ color: 'text.dark', fontSize: 13, fontStyle: 'italic' }}>
                                                Please rate the level of student skills required
                                            </Typography>
                                        </CardContent>
                                        <CardActions sx={{ px: 3, pb: 3, display: 'flex', justifyContent: 'center' }}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormControlLabel value="0" control={<Radio />} label="0" labelPlacement="top" />
                                                    <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="top" />
                                                    <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="top" />
                                                    <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="top" />
                                                    <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="top" />
                                                    <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="top" />
                                                </RadioGroup>
                                            </FormControl>
                                        </CardActions>
                                    </Card>

                                    <Card sx={{ width: 1000, mt: 2, borderRadius: 3 }}>
                                        <CardContent sx={{ px: 3 }}>
                                            <Typography gutterBottom sx={{ color: 'text.dark', fontSize: 16 }}>
                                                Optional : Add short explanation to your ratings
                                            </Typography>
                                            <TextField fullWidth id="standard-basic" size="small" label="Your Answer" variant="standard" />
                                        </CardContent>
                                    </Card>

                                    <Card sx={{ width: 1000, mt: 2, borderRadius: 3 }}>
                                        <CardContent sx={{ px: 3 }}>
                                            <Typography gutterBottom sx={{ color: 'text.dark', fontSize: 16, mb: 4 }}>
                                                Choose one or two topics which students should develop relatively higher proficiency (+) and lower proficiency (-).
                                            </Typography>
                                            <Box>
                                                <Grid container spacing={2} columns={36} fullWidth>
                                                    <Grid size={12}>
                                                    </Grid>
                                                    <Grid size={8} textAlign={'center'}>
                                                        - (lower)
                                                    </Grid>
                                                    <Grid size={8} textAlign={'center'}>
                                                        0 (normal)
                                                    </Grid>
                                                    <Grid size={8} textAlign={'center'}>
                                                        + (higher)
                                                    </Grid>
                                                </Grid>
                                                {(pertanyaanDetList
                                                    .find(p => p.pertanyaanID === pertanyaanData.pertanyaanID)?.detail.map((pertanyaanDetData) => (
                                                        <React.Fragment key={pertanyaanDetData.kodePertanyaanDetail}>
                                                            <Grid container spacing={2} columns={36} sx={{ backgroundColor: grey[100], mt: 1 }} fullWidth>
                                                                <Grid size={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Typography sx={{ ml: 1 }}>
                                                                        {pertanyaanDetData.kodePertanyaanDetail} {pertanyaanDetData.pertanyaanDetail}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid size={8} textAlign={'center'}>
                                                                    <Radio
                                                                        checked={selectedValue === 'a'}
                                                                        onChange={handleChange}
                                                                        value="a"
                                                                        name="radio-buttons"
                                                                        inputProps={{ 'aria-label': 'A' }}
                                                                    />
                                                                </Grid>
                                                                <Grid size={8} textAlign={'center'}>
                                                                    <Radio
                                                                        checked={selectedValue === 'b'}
                                                                        onChange={handleChange}
                                                                        value="b"
                                                                        name="radio-buttons"
                                                                        inputProps={{ 'aria-label': 'B' }}
                                                                    />
                                                                </Grid>
                                                                <Grid size={8} textAlign={'center'}>
                                                                    <Radio
                                                                        checked={selectedValue === 'c'}
                                                                        onChange={handleChange}
                                                                        value="c"
                                                                        name="radio-buttons"
                                                                        inputProps={{ 'aria-label': 'C' }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </React.Fragment>
                                                    )))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                    <Card sx={{ width: 1000, mt: 2, borderRadius: 3 }}>
                        <CardActions sx={{ px: 3, pb: 3, display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary">
                                Submit
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}

export default Survei;