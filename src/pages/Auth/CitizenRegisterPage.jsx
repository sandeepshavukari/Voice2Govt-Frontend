// src/pages/Auth/CitizenRegisterPage.jsx
import React, { useState } from 'react';
import { registerCitizen } from '../../api/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px 20px 0 0'
    }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        },
        '&.Mui-focused': {
            background: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'primary.main',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
        }
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px',
    fontWeight: 600,
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)'
    }
}));

function CitizenRegisterPage() {
    const [formData, setFormData] = useState({
        ctiUsername: '',
        ctiPassword: '',
        cti_firstName: '',
        cti_lastName: '',
        cti_email: '',
        cti_phoneNumber: '',
        cti_dob: '',
        ctiConstituency: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await registerCitizen(formData);
            setMessage(`Registration successful for ${response.ctiUsername}!`);
            navigate('/citizen/login');
        } catch (error) {
            setMessage(`Registration failed: ${error.message}`);
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            py: 4,
            px: { xs: 2, md: 4 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <StyledPaper elevation={8} sx={{ maxWidth: 600, width: '100%', p: { xs: 3, md: 5 } }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Box sx={{
                            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                            borderRadius: '50%',
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                        }}>
                            <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                    </Box>
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 800,
                            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            letterSpacing: '1px'
                        }}
                    >
                        Citizen Registration
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            fontWeight: 500,
                            opacity: 0.8
                        }}
                    >
                        Join our community and make your voice heard
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                name="ctiUsername"
                                value={formData.ctiUsername}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                name="ctiPassword"
                                type="password"
                                value={formData.ctiPassword}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                name="cti_firstName"
                                value={formData.cti_firstName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                name="cti_lastName"
                                value={formData.cti_lastName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="cti_email"
                                type="email"
                                value={formData.cti_email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                name="cti_phoneNumber"
                                type="tel"
                                value={formData.cti_phoneNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="Date of Birth"
                                variant="outlined"
                                fullWidth
                                name="cti_dob"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.cti_dob}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                label="Constituency"
                                variant="outlined"
                                fullWidth
                                name="ctiConstituency"
                                value={formData.ctiConstituency}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <StyledButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 4, mb: 3, py: 1.5, fontSize: '1.1rem' }}
                    >
                        Register as Citizen
                    </StyledButton>
                </Box>

                {message && (
                    <Box sx={{ 
                        mt: 3, 
                        p: 3, 
                        borderRadius: 2, 
                        background: message.includes('failed') 
                            ? 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)' 
                            : 'linear-gradient(45deg, #4caf50 30%, #45a049 90%)', 
                        color: 'white' 
                    }}>
                        <Typography variant="body1" align="center" sx={{ fontWeight: 600 }}>
                            {message}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Already have an account?
                    </Typography>
                    <Chip
                        component={Link}
                        to="/citizen/login"
                        label="Login here"
                        clickable
                        sx={{
                            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                            color: 'white',
                            fontWeight: 600,
                            '&:hover': {
                                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)'
                            }
                        }}
                    />
                </Box>
            </StyledPaper>
        </Box>
    );
}

export default CitizenRegisterPage;