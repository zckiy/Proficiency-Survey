import * as React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 

export default function FinishPage() {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}
        >
            <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Terima Kasih!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Terima kasih telah mengisi survei ini. Jawaban Anda sangat berarti bagi kami.
                </Typography>

                <Button variant="contained" color="primary" sx={{ mt: 3 }} component={Link} to="/">
                    Kembali ke Halaman Utama
                </Button>
            </Box>
        </Container>
    );
}
