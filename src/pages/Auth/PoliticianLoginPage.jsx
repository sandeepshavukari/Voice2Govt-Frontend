// src/pages/Auth/PoliticianLoginPage.jsx
import React, { useState, useContext } from 'react';
import { loginPolitician } from '../../api/apiService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import {
    Box, Typography, TextField, Button, Paper,
    Snackbar, Alert
} from '@mui/material';

function PoliticianLoginPage() {
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
            const politicianDto = await loginPolitician({ polUsername: username, polPassword: password });
            if (politicianDto && politicianDto.polUsername) {
                const loggedInUser = {
                    type: 'politician',
                    username: politicianDto.polUsername,
                    // --- THE REAL FIX: Access camelCase properties as they appear in JSON ---
                    firstName: politicianDto.pol_firstName, // Access 'pol_firstName' (camelCase)
                    lastName: politicianDto.pol_lastName,   // Access 'pol_lastName' (camelCase)
                    // --- END THE REAL FIX ---
                    id: politicianDto.pol_id,
                    pol_id: politicianDto.pol_id
                };
                handleLoginSuccess(loggedInUser);
                setMessage(`Login successful for ${loggedInUser.firstName} ${loggedInUser.lastName}!`);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                navigate('/politician/dashboard');
            } else {
                setMessage('Login failed: Invalid credentials received from server or authentication failed.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Login API call failed:", error);

            let displayMessage = 'An unexpected error occurred. Please try again.';

            if (error && error.message) {
                displayMessage = error.message;
            } else if (typeof error === 'string') {
                displayMessage = error;
            } else if (typeof error.toString === 'function') {
                displayMessage = error.toString();
            }

            if (displayMessage.includes('Unauthorized') || displayMessage.includes('401')) {
                displayMessage = 'Invalid username or password.';
            } else if (displayMessage.includes('Failed to fetch')) {
                displayMessage = 'Network error: Could not connect to the server. Please check your internet connection and try again.';
            }

            setMessage(`Login failed: ${displayMessage}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <Paper elevation={6} sx={{ maxWidth: 450, mx: 'auto', p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Politician Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                >
                    Login
                </Button>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                {/* Registration link remains commented out */}
            </Typography>

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
        </Paper>
    );
}

export default PoliticianLoginPage;