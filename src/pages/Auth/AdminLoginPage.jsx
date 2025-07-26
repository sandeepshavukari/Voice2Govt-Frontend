// src/pages/Auth/AdminLoginPage.jsx
import React, { useState, useContext } from 'react';
import { loginAdmin } from '../../api/apiService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { handleLoginSuccess } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const adminDto = await loginAdmin({ admUsername: username, admPassword: password });
            if (adminDto && adminDto.admUsername) {
                const loggedInUser = {
                    type: 'admin',
                    username: adminDto.admUsername,
                    firstName: adminDto.adm_firstName,
                    lastName: adminDto.adm_lastName,
                    id: adminDto.adm_id
                };
                handleLoginSuccess(loggedInUser);
                setMessage(`Login successful for ${loggedInUser.firstName} ${loggedInUser.lastName}!`);
                navigate('/admin/dashboard');
            } else {
                setMessage('Login failed: Invalid credentials received from server or authentication failed.');
            }
        } catch (error) {
            console.error("Login API call failed:", error);
            setMessage(`Login failed: ${error.message || 'Network error or server unavailable.'}`);
        }
    };

    return (
        <Paper elevation={6} sx={{ maxWidth: 450, mx: 'auto', p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Admin Login
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
            {message && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mt: 2, color: message.includes('failed') || message.includes('Error') ? 'error.main' : 'success.main', fontWeight: 'medium' }}
                >
                    {message}
                </Typography>
            )}
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account? <Link to="/admin/register" style={{ textDecoration: 'none', color: theme => theme.palette.primary.main, fontWeight: 'medium' }}>Register here</Link>
            </Typography>
        </Paper>
    );
}

export default AdminLoginPage;