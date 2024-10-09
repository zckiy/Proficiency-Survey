import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Card sx={{ width: 1000, height: 400, mt: 4 }}> {/* Set the width and height here */}
                <CardHeader
                    sx={{ backgroundColor: '#577399' }}
                    titleTypographyProps={{ sx: { color: 'white', fontSize: '20px' } }} 
                    title="1. FUNDAMENTAL KNOWLEDGE AND REASONING"
                />
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.dark', fontSize: 14,  }}>
                        Word of the Day
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Container>
    );
}
