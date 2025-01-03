import * as React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FinishPage() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        localStorage.removeItem("captchaVerified");
        navigate("/");
    };

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

                <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSubmit}>
                    Kembali ke Halaman Utama
                </Button>
            </Box>
        </Container>
    );
}
