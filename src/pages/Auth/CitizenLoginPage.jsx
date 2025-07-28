// src/pages/Auth/CitizenLoginPage.jsx
import React, { useState, useContext } from 'react';
import { loginCitizen } from '../../api/apiService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import {
    Box, Typography, TextField, Button, Paper,
    Snackbar, Alert, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

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

function CitizenLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const { handleLoginSuccess } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSnackbarOpen(false);

        try {
            const citizenDto = await loginCitizen({ ctiUsername: username, ctiPassword: password });

            if (citizenDto && citizenDto.ctiUsername) {
                const loggedInUser = {
                    type: 'citizen',
                    username: citizenDto.ctiUsername,
                    firstName: citizenDto.cti_firstName,
                    lastName: citizenDto.cti_lastName,
                    id: citizenDto.cti_id,
                    email: citizenDto.cti_email,
                    phoneNumber: citizenDto.cti_phoneNumber,
                    dob: citizenDto.cti_dob,
                    constituency: citizenDto.ctiConstituency
                };

                handleLoginSuccess(loggedInUser);
                setMessage(`Login successful for ${loggedInUser.firstName} ${loggedInUser.lastName}!`);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                navigate('/citizen/dashboard');
            } else {
                setMessage('Login failed: Invalid credentials received from server or authentication failed.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Login API call failed:", error);
            setMessage(`Login failed: ${error.message || 'Network error or server unavailable.'}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
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
            <StyledPaper elevation={8} sx={{ maxWidth: 450, width: '100%', p: { xs: 3, md: 5 } }}>
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
                            <PersonIcon sx={{ fontSize: 40, color: 'white' }} />
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
                        Citizen Login
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            fontWeight: 500,
                            opacity: 0.8
                        }}
                    >
                        Access your citizen dashboard
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <StyledTextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <StyledTextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <StyledButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 4, mb: 3, py: 1.5, fontSize: '1.1rem' }}
                    >
                        Login as Citizen
                    </StyledButton>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Don't have an account?
                    </Typography>
                    <Chip
                        component={Link}
                        to="/citizen/register"
                        label="Register here"
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

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </StyledPaper>
        </Box>
    );
}

export default CitizenLoginPage;