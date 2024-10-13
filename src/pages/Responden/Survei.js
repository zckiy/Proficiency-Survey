import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Survei() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Box>
                <Card sx={{ width: 1000, mt: 4, borderRadius: 3 }}>
                    <CardHeader
                        sx={{ backgroundColor: '#577399' }}
                        titleTypographyProps={{ sx: { color: 'white', fontSize: '20px' } }}
                        title="1. FUNDAMENTAL KNOWLEDGE AND REASONING"
                    />
                    <CardContent sx={{ px: 3 }}>
                        <Typography gutterBottom sx={{ color: 'text.dark', fontSize: 18, fontWeight: 'bold' }}>
                            1.1 ENGINEERING REASONING AND PROBLEM SOLVING
                        </Typography>
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
                        <Typography gutterBottom sx={{ color: 'text.dark', fontSize: 16 }}>
                            Choose one or two topics which students should develop relatively higher proficiency (+) and lower proficiency (-).
                        </Typography>
                        <TextField fullWidth id="standard-basic" size="small" label="Your Answer" variant="standard" />
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}
