// src/pages/Dashboards/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import {
    getAllAdmins, getAllCitizens, getAllPoliticians,
} from '../../api/apiService';
import { 
    Box, Typography, Button, Paper, Grid, Card, CardContent, 
    IconButton, Chip, Divider, LinearProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px 16px 0 0'
    },
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
        '& .card-icon': {
            transform: 'scale(1.05)'
        },
        '& .card-arrow': {
            transform: 'translateX(3px)'
        }
    }
}));

const StatsCard = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '12px',
    padding: theme.spacing(2.5),
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: -30,
        right: -30,
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: 0
    }
}));

function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [adminCount, setAdminCount] = useState(0);
    const [citizenCount, setCitizenCount] = useState(0);
    const [politicianCount, setPoliticianCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCounts = async () => {
        setLoading(true);
        try {
            const [admins, citizens, politicians] = await Promise.all([
                getAllAdmins(),
                getAllCitizens(),
                getAllPoliticians()
            ]);
            setAdminCount(admins.length);
            setCitizenCount(citizens.length);
            setPoliticianCount(politicians.length);
        } catch (error) {
            setMessage(`Error fetching counts: ${error.message}`);
        } finally {
            setLoading(false);
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

    const totalUsers = adminCount + citizenCount + politicianCount;

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            py: 3,
            px: { xs: 2, md: 4 },
            minHeight: '100vh'
        }}>
            {/* Compact Header Section */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                        letterSpacing: '0.5px'
                    }}
                >
                    Admin Dashboard
                </Typography>
                <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ 
                        fontWeight: 500,
                        mb: 3,
                        opacity: 0.8
                    }}
                >
                    Welcome back, {user.firstName || 'Admin'}! Here's your system overview
                </Typography>
                
                {/* Compact Stats */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                    <StatsCard elevation={2}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {totalUsers}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Total Users
                        </Typography>
                    </StatsCard>
                    <StatsCard elevation={2}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {adminCount}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Admins
                        </Typography>
                    </StatsCard>
                    <StatsCard elevation={2}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {citizenCount}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Citizens
                        </Typography>
                    </StatsCard>
                    <StatsCard elevation={2}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {politicianCount}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Politicians
                        </Typography>
                    </StatsCard>
                </Box>
            </Box>

            {message && (
                <Box sx={{ mb: 3, p: 2, borderRadius: 2, background: 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)', color: 'white' }}>
                    <Typography variant="body2" align="center" sx={{ fontWeight: 600 }}>
                        {message}
                    </Typography>
                </Box>
            )}

            {/* Management Cards */}
            <Grid container spacing={3} justifyContent="center">
                {/* Manage Admins Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => handleManageClick('/admin/manage-admins')}>
                        <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                mb: 2
                            }}>
                                <Box sx={{
                                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                    borderRadius: '50%',
                                    p: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                                }}>
                                    <PersonIcon sx={{ fontSize: 30, color: 'white' }} className="card-icon" />
                                </Box>
                            </Box>
                            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                                Manage Admins
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                                View and manage administrator accounts
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Chip 
                                    label={`${adminCount} Admins`} 
                                    color="primary" 
                                    variant="outlined"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                                <ArrowForwardIcon className="card-arrow" sx={{ color: 'primary.main', transition: 'transform 0.3s ease', fontSize: 20 }} />
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Manage Citizens Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => handleManageClick('/admin/manage-citizens')}>
                        <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                mb: 2
                            }}>
                                <Box sx={{
                                    background: 'linear-gradient(45deg, #4caf50 30%, #45a049 90%)',
                                    borderRadius: '50%',
                                    p: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
                                }}>
                                    <PeopleIcon sx={{ fontSize: 30, color: 'white' }} className="card-icon" />
                                </Box>
                            </Box>
                            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                                Manage Citizens
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                                Oversee citizen accounts and submissions
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Chip 
                                    label={`${citizenCount} Citizens`} 
                                    color="success" 
                                    variant="outlined"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                                <ArrowForwardIcon className="card-arrow" sx={{ color: 'success.main', transition: 'transform 0.3s ease', fontSize: 20 }} />
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Manage Politicians Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard onClick={() => handleManageClick('/admin/manage-politicians')}>
                        <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                mb: 2
                            }}>
                                <Box sx={{
                                    background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
                                    borderRadius: '50%',
                                    p: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
                                }}>
                                    <HowToVoteIcon sx={{ fontSize: 30, color: 'white' }} className="card-icon" />
                                </Box>
                            </Box>
                            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                                Manage Politicians
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                                Manage politician accounts and assignments
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Chip 
                                    label={`${politicianCount} Politicians`} 
                                    color="info" 
                                    variant="outlined"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                                <ArrowForwardIcon className="card-arrow" sx={{ color: 'info.main', transition: 'transform 0.3s ease', fontSize: 20 }} />
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>

            {/* Compact Quick Actions */}
            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                    Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => navigate('/admin/manage-issues')}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            fontWeight: 600,
                            '&:hover': {
                                background: 'primary.main',
                                color: 'white',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DashboardIcon sx={{ fontSize: 20 }} />
                            <Typography>Manage Issues</Typography>
                        </Box>
                    </Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => navigate('/politician/register')}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            borderColor: 'success.main',
                            color: 'success.main',
                            fontWeight: 600,
                            '&:hover': {
                                background: 'success.main',
                                color: 'white',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HowToVoteIcon sx={{ fontSize: 20 }} />
                            <Typography>Add Politician</Typography>
                        </Box>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboard;