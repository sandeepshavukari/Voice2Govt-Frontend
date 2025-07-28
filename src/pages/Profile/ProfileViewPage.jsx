// src/pages/Profile/ProfileViewPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getAdminProfileByUsername, getCitizenProfileByUsername, getPoliticianProfileByUsername,
    updateAdminProfile, updateCitizenProfile, updatePoliticianProfile
} from '../../api/apiService';
import {
    Box, Typography, Paper, CircularProgress, Alert, Avatar, Grid, Button,
    Divider
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../../App';
import { styled } from '@mui/material/styles';

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

const StyledButton = styled(Button)(({ theme, variant }) => ({
    borderRadius: '12px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    ...(variant === 'contained' && {
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        '&:hover': {
            background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)'
        }
    }),
    ...(variant === 'outlined' && {
        borderColor: 'primary.main',
        color: 'primary.main',
        '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'primary.light',
            color: 'primary.dark'
        }
    })
}));

const DetailCard = styled(Paper)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: theme.spacing(2),
    minHeight: '60px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.15)'
    }
}));

function ProfileViewPage() {
    const { userType, idOrUsername } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated, handleLogout } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                let fetchedProfile = null;
                console.log("Fetching profile for userType:", userType, "idOrUsername:", idOrUsername);

                if (userType === 'admin') {
                    fetchedProfile = await getAdminProfileByUsername(idOrUsername);
                } else if (userType === 'citizen') {
                    fetchedProfile = await getCitizenProfileByUsername(idOrUsername);
                } else if (userType === 'politician') {
                    fetchedProfile = await getPoliticianProfileByUsername(idOrUsername);
                } else {
                    setError('Invalid user type specified.');
                }

                if (fetchedProfile) {
                    console.log("Profile data fetched successfully:", fetchedProfile);
                    setProfile(fetchedProfile);
                } else {
                    console.warn("Profile data fetched was null or empty.");
                    setError('Profile not found or no data returned.');
                }
            } catch (err) {
                console.error("Failed to fetch profile in ProfileViewPage:", err);
                setError(`Failed to load profile: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (userType && idOrUsername) {
            if (isAuthenticated && user && ((user.type === userType && user.username === idOrUsername) || user.type === 'admin')) {
                fetchProfile();
            } else {
                setLoading(false);
                setError('Unauthorized access or not logged in.');
            }
        } else {
            setLoading(false);
            setError('User type or ID/Username not provided in URL.');
        }
    }, [userType, idOrUsername, user, isAuthenticated]);

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '50vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                minHeight: '100vh'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Loading profile...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (error) {
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
                <Alert severity="error" sx={{ maxWidth: 600, width: '100%' }}>
                    {error}
                    <StyledButton onClick={() => navigate(-1)} sx={{ ml: 2 }}>
                        Go Back
                    </StyledButton>
                </Alert>
            </Box>
        );
    }

    if (!profile) {
        return (
            <Box sx={{ 
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="h6" align="center" sx={{ color: 'text.secondary' }}>
                    Profile data not available.
                </Typography>
            </Box>
        );
    }

    const getProfileDetails = () => {
        let title = '';
        let fields = [];
        let profileImageSrc = null;

        if (userType === 'admin') {
            title = `${profile.adm_firstName || ''} ${profile.adm_lastName || ''}`.trim();
            fields = [
                { label: 'Username', value: profile.admUsername, icon: <PersonOutlineIcon /> },
                { label: 'Email', value: profile.adm_email, icon: <EmailIcon /> },
                { label: 'Phone', value: profile.adm_phoneNumber, icon: <PhoneIcon /> },
                { label: 'Date of Birth', value: profile.adm_dob, icon: <CakeIcon /> },
            ];
        } else if (userType === 'citizen') {
            title = `${profile.cti_firstName || ''} ${profile.cti_lastName || ''}`.trim();
            fields = [
                { label: 'Username', value: profile.ctiUsername, icon: <PersonOutlineIcon /> },
                { label: 'Email', value: profile.cti_email, icon: <EmailIcon /> },
                { label: 'Phone', value: profile.cti_phoneNumber, icon: <PhoneIcon /> },
                { label: 'Date of Birth', value: profile.cti_dob, icon: <CakeIcon /> },
                { label: 'Constituency', value: profile.ctiConstituency, icon: <HomeIcon /> },
            ];
        } else if (userType === 'politician') {
            title = `${profile.pol_firstName || ''} ${profile.pol_lastName || ''}`.trim();
            fields = [
                { label: 'Username', value: profile.polUsername, icon: <PersonOutlineIcon /> },
                { label: 'Email', value: profile.pol_email, icon: <EmailIcon /> },
                { label: 'Phone', value: profile.pol_phoneNumber, icon: <PhoneIcon /> },
                { label: 'Date of Birth', value: profile.pol_dob, icon: <CakeIcon /> },
                { label: 'Constituency', value: profile.polConstituency, icon: <HomeIcon /> },
            ];
        }

        return { title, fields: fields.filter(field => field.value), profileImageSrc };
    };

    const { title, fields, profileImageSrc } = getProfileDetails();

    const isAuthorizedToEdit = isAuthenticated && user && (
        (user.type === userType && user.username === idOrUsername) ||
        user.type === 'admin'
    );

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            py: 4,
            px: { xs: 2, md: 4 }
        }}>
            <StyledPaper elevation={8} sx={{ maxWidth: 800, mx: 'auto', p: { xs: 3, md: 6 }, my: 4 }}>
                {/* Profile Header Section */}
                <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
                    <Avatar
                        sx={{
                            width: 140,
                            height: 140,
                            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                            border: '4px solid rgba(255, 255, 255, 0.3)',
                            mb: 3,
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(10px)'
                        }}
                        src={profileImageSrc || undefined}
                    >
                        {!profileImageSrc && <PersonOutlineIcon sx={{ fontSize: 90, color: 'white' }} />}
                    </Avatar>
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
                            textAlign: 'center',
                            letterSpacing: '1px'
                        }}
                    >
                        {title || userType.charAt(0).toUpperCase() + userType.slice(1) + ' Profile'}
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            mb: 2,
                            fontWeight: 500,
                            opacity: 0.8
                        }}
                    >
                        ({userType.charAt(0).toUpperCase() + userType.slice(1)} Profile)
                    </Typography>
                    <Divider sx={{ width: '60%', borderBottomWidth: 2, borderColor: 'rgba(102, 126, 234, 0.3)', mb: 2 }} />
                </Box>

                {/* Profile Details Grid */}
                <Grid container spacing={3}>
                    {fields.map((field, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <DetailCard>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ 
                                        mr: 2, 
                                        color: 'primary.main', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        fontSize: 30 
                                    }}>
                                        {field.icon}
                                    </Box>
                                    <Box>
                                        <Typography 
                                            variant="caption" 
                                            color="text.secondary" 
                                            display="block" 
                                            sx={{ 
                                                fontWeight: 700, 
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}
                                        >
                                            {field.label}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            color="text.primary" 
                                            sx={{ 
                                                wordBreak: 'break-word', 
                                                fontWeight: 600 
                                            }}
                                        >
                                            {field.value}
                                        </Typography>
                                    </Box>
                                </Box>
                            </DetailCard>
                        </Grid>
                    ))}
                </Grid>

                {/* Action Buttons */}
                <Box display="flex" justifyContent="center" mt={6} gap={3} flexWrap="wrap">
                    {isAuthorizedToEdit && (
                        <StyledButton
                            variant="contained"
                            onClick={() => navigate(`/profile/${userType}/${idOrUsername}/edit`)}
                            sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
                        >
                            Edit Profile
                        </StyledButton>
                    )}
                    <StyledButton
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
                    >
                        Go Back
                    </StyledButton>
                    {isAuthenticated && user && user.type === userType && user.username === idOrUsername && (
                        <StyledButton 
                            variant="contained" 
                            color="error" 
                            onClick={handleLogout} 
                            sx={{ 
                                py: 1.5, 
                                px: 4, 
                                fontSize: '1.1rem',
                                background: 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #d32f2f 30%, #c62828 90%)'
                                }
                            }}
                        >
                            Logout
                        </StyledButton>
                    )}
                </Box>
            </StyledPaper>
        </Box>
    );
}

export default ProfileViewPage;