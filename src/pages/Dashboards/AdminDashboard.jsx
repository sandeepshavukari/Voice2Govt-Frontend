// src/pages/Dashboards/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import {
    getAllAdmins, getAllCitizens, getAllPoliticians,
} from '../../api/apiService';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

function AdminDashboard() {
    const { user /* Removed handleLogout */ } = useContext(AuthContext); // Removed handleLogout
    const [message, setMessage] = useState('');
    const [adminCount, setAdminCount] = useState(0);
    const [citizenCount, setCitizenCount] = useState(0);
    const [politicianCount, setPoliticianCount] = useState(0);
    const navigate = useNavigate();

    const fetchCounts = async () => {
        try {
            const admins = await getAllAdmins();
            setAdminCount(admins.length);
            const citizens = await getAllCitizens();
            setCitizenCount(citizens.length);
            const politicians = await getAllPoliticians();
            setPoliticianCount(politicians.length);
        } catch (error) {
            setMessage(`Error fetching counts: ${error.message}`);
        }
    };

    useEffect(() => {
        if (user && user.type === 'admin') {
            fetchCounts();
        }
    }, [user]);

    if (!user || user.type !== 'admin') {
        return <Typography variant="h5" color="error" align="center" sx={{ mt: 5 }}>Access Denied.</Typography>;
    }

    const handleManageClick = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 4 }}>
                Admin Panel - Welcome, {user.username}!
            </Typography>
            <Box display="flex" justifyContent="flex-end" mb={3}>
                {/* Removed View My Profile Button */}
                {/* Removed Logout Button */}
            </Box>
            {message && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mb: 3, p: 2, borderRadius: 1, color: 'error.main', bgcolor: 'error.light', border: 1, borderColor: 'error.main' }}
                >
                    {message}
                </Typography>
            )}

            <Grid container spacing={4} justifyContent="center" sx={{ mt: 5 }}>
                {/* Card: Manage Admins */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': { transform: 'scale(1.03)', boxShadow: 10 },
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        }}
                        onClick={() => handleManageClick('/admin/manage-admins')}
                    >
                        <PersonIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Manage Admins
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            Total: {adminCount}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card: Manage Citizens */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': { transform: 'scale(1.03)', boxShadow: 10 },
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        }}
                        onClick={() => handleManageClick('/admin/manage-citizens')}
                    >
                        <PeopleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                        <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Manage Citizens
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            Total: {citizenCount}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card: Manage Politicians */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={6}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': { transform: 'scale(1.03)', boxShadow: 10 },
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        }}
                        onClick={() => handleManageClick('/admin/manage-politicians')}
                    >
                        <HowToVoteIcon sx={{ fontSize: 80, color: 'info.main', mb: 2 }} />
                        <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Manage Politicians
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            Total: {politicianCount}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminDashboard;