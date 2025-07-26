// src/pages/Profile/ProfileViewPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getAdminProfileByUsername, getCitizenProfileByUsername, getPoliticianProfileByUsername,
    updateAdminProfile, updateCitizenProfile, updatePoliticianProfile // Keep if EditProfile is linked here
} from '../../api/apiService';
import { Box, Typography, Paper, CircularProgress, Alert, Avatar, Grid, Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
// import LocationOnIcon from '@mui/icons-material/LocationOn'; // Not directly used in fields, commented out
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PublicIcon from '@mui/icons-material/Public';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../../App';

function ProfileViewPage() {
    const { userType, idOrUsername } = useParams();
    const navigate = useNavigate();
    // FIX: Destructure isAuthenticated from AuthContext
    const { user, isAuthenticated, handleLogout } = useContext(AuthContext); // Access isAuthenticated

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
            fetchProfile();
        } else {
            setLoading(false);
            setError('User type or ID/Username not provided in URL.');
        }
    }, [userType, idOrUsername]); // Dependencies ensure re-fetch on URL param changes

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading profile...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 3, mx: 'auto', maxWidth: 600 }}>
                {error}
                <Button onClick={() => navigate(-1)} sx={{ ml: 2 }}>Go Back</Button>
            </Alert>
        );
    }

    if (!profile) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 5 }}>
                Profile data not available.
            </Typography>
        );
    }

    const getProfileDetails = () => {
        let title = '';
        let icon = null;
        let fields = [];

        // Using consistent property names from DTOs
        if (userType === 'admin') {
            title = `${profile.adm_firstName} ${profile.adm_lastName}`;
            icon = <AdminPanelSettingsIcon sx={{ fontSize: 80, color: 'primary.main' }} />;
            fields = [
                { label: 'Username', value: profile.admUsername, icon: <PersonOutlineIcon /> },
                { label: 'Email', value: profile.adm_email, icon: <EmailIcon /> },
                { label: 'Phone', value: profile.adm_phoneNumber, icon: <PhoneIcon /> },
                { label: 'Date of Birth', value: profile.adm_dob, icon: <CakeIcon /> },
            ];
        } else if (userType === 'citizen') {
            title = `${profile.cti_firstName} ${profile.cti_lastName}`;
            icon = <PublicIcon sx={{ fontSize: 80, color: 'success.main' }} />;
            fields = [
                { label: 'Username', value: profile.ctiUsername, icon: <PersonOutlineIcon /> },
                { label: 'Email', value: profile.cti_email, icon: <EmailIcon /> },
                { label: 'Phone', value: profile.cti_phoneNumber, icon: <PhoneIcon /> },
                { label: 'Date of Birth', value: profile.cti_dob, icon: <CakeIcon /> },
                { label: 'Constituency', value: profile.ctiConstituency, icon: <HomeIcon /> },
            ];
        } else if (userType === 'politician') {
            title = `${profile.pol_firstName} ${profile.pol_lastName}`;
            icon = <HowToVoteIcon sx={{ fontSize: 80, color: 'info.main' }} />;
            fields = [
                { label: 'Username', value: profile.polUsername, icon: <PersonOutlineIcon /> },
                { label: 'Email', value: profile.pol_email, icon: <EmailIcon /> },
                { label: 'Phone', value: profile.pol_phoneNumber, icon: <PhoneIcon /> },
                { label: 'Date of Birth', value: profile.pol_dob, icon: <CakeIcon /> },
                { label: 'Constituency', value: profile.polConstituency, icon: <HomeIcon /> },
            ];
        }

        return { title, icon, fields };
    };

    const { title, icon, fields } = getProfileDetails();

    // FIX: isAuthenticated is now correctly accessed
    // Check if the currently logged-in user is authorized to edit this profile
    const isAuthorizedToEdit = isAuthenticated && user && (
        (user.type === userType && user.username === idOrUsername) || // User is editing their own profile
        user.type === 'admin' // Or the logged-in user is an Admin
    );


    return (
        <Paper elevation={6} sx={{ maxWidth: 700, mx: 'auto', p: 4, borderRadius: 3, my: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: 'background.default', border: '2px solid', borderColor: 'primary.light', mb: 2 }}>
                    {icon}
                </Avatar>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    ({userType.charAt(0).toUpperCase() + userType.slice(1)} Profile)
                </Typography>
            </Box>

            {/* FIX: Updated Grid container and item syntax */}
            <Grid container spacing={2}> {/* Removed unnecessary `sx` here, spacing is on item */}
                {fields.map((field, index) => (
                    field.value && (
                        <Grid item xs={12} sm={6} key={index}> {/* Changed to Grid item */}
                            <Box display="flex" alignItems="center" sx={{ bgcolor: 'action.hover', p: 1.5, borderRadius: 1 }}>
                                {field.icon && <Box sx={{ mr: 1, color: 'primary.main' }}>{field.icon}</Box>}
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                    {field.label}:
                                </Typography>
                                <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                                    {field.value}
                                </Typography>
                            </Box>
                        </Grid>
                    )
                ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={4} gap={2}>
                {isAuthorizedToEdit && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/profile/${userType}/${idOrUsername}/edit`)}
                    >
                        Edit Profile
                    </Button>
                )}
                <Button variant="outlined" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Paper>
    );
}

export default ProfileViewPage;