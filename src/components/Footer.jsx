// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: theme.spacing(2, 0),
    marginTop: 'auto',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
    }
}));

const Footer = () => {
    return (
        <StyledFooter>
            <Container maxWidth="xl">
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 2 }
                }}>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            textAlign: 'center',
                            fontWeight: 500,
                            opacity: 0.9
                        }}
                    >
                        © 2024 Voice2Govt. All Rights Reserved.
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            textAlign: 'center',
                            fontWeight: 600,
                            opacity: 1
                        }}
                    >
                        Developed by Shavukari Sandeep
                    </Typography>
                </Box>
            </Container>
        </StyledFooter>
    );
};

export default Footer; 