// src/pages/Profile/EditProfilePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getAdminProfileByUsername, getCitizenProfileByUsername, getPoliticianProfileByUsername,
    updateAdminProfile, updateCitizenProfile, updatePoliticianProfile
} from '../../api/apiService';
import {
    Box, Typography, TextField, Button, Paper, CircularProgress, Alert, Grid, InputLabel, Input
} from '@mui/material';
import { AuthContext } from '../../App';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

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

function EditProfilePage() {
    const { userType, idOrUsername } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            setError(null);
            try {
                let fetchedData = null;
                if (userType === 'admin') {
                    fetchedData = await getAdminProfileByUsername(idOrUsername);
                } else if (userType === 'citizen') {
                    fetchedData = await getCitizenProfileByUsername(idOrUsername);
                } else if (userType === 'politician') {
                    fetchedData = await getPoliticianProfileByUsername(idOrUsername);
                } else {
                    setError('Invalid user type.');
                    return;
                }
                setFormData(fetchedData);
            } catch (err) {
                console.error("Failed to fetch profile for edit:", err);
                setError(`Failed to load profile for editing: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (userType && idOrUsername && isAuthenticated && user) {
            if ((user.type === userType && user.username === idOrUsername) || user.type === 'admin') {
                fetchProfileData();
            } else {
                setLoading(false);
                setError('Unauthorized access to edit this profile.');
            }
        } else {
            setLoading(false);
            setError('Authentication required or invalid access.');
        }
    }, [userType, idOrUsername, user, isAuthenticated]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError(null);
        setLoading(true);
        try {
            const profileId = formData.adm_id || formData.cti_id || formData.pol_id;

            if (!profileId) {
                throw new Error("Profile ID not found for update.");
            }

            if (userType === 'admin') {
                await updateAdminProfile(profileId, formData);
            } else if (userType === 'citizen') {
                await updateCitizenProfile(profileId, formData);
            } else if (userType === 'politician') {
                await updatePoliticianProfile(profileId, formData);
            }

            setMessage(`Profile updated successfully!`);
            navigate(`/profile/${userType}/${idOrUsername}`);
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError(`Failed to update profile: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

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
                        Loading profile data...
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

    const getFormFields = () => {
        let fields = [];
        if (userType === 'admin') {
            fields = [
                { name: 'admUsername', label: 'Username', type: 'text', required: true },
                { name: 'admPassword', label: 'New Password (leave blank to keep current)', type: 'password', required: false },
                { name: 'adm_firstName', label: 'First Name', type: 'text', required: true },
                { name: 'adm_lastName', label: 'Last Name', type: 'text', required: true },
                { name: 'adm_email', label: 'Email', type: 'email', required: true },
                { name: 'adm_phoneNumber', label: 'Phone Number', type: 'tel', required: false },
                { name: 'adm_dob', label: 'Date of Birth', type: 'date', required: false },
            ];
        } else if (userType === 'citizen') {
            fields = [
                { name: 'ctiUsername', label: 'Username', type: 'text', required: true },
                { name: 'ctiPassword', label: 'New Password (leave blank to keep current)', type: 'password', required: false },
                { name: 'cti_firstName', label: 'First Name', type: 'text', required: true },
                { name: 'cti_lastName', label: 'Last Name', type: 'text', required: true },
                { name: 'cti_email', label: 'Email', type: 'email', required: true },
                { name: 'cti_phoneNumber', label: 'Phone Number', type: 'tel', required: false },
                { name: 'cti_dob', label: 'Date of Birth', type: 'date', required: false },
                { name: 'ctiConstituency', label: 'Constituency', type: 'text', required: true },
            ];
        } else if (userType === 'politician') {
            fields = [
                { name: 'polUsername', label: 'Username', type: 'text', required: true },
                { name: 'polPassword', label: 'New Password (leave blank to keep current)', type: 'password', required: false },
                { name: 'pol_firstName', label: 'First Name', type: 'text', required: true },
                { name: 'pol_lastName', label: 'Last Name', type: 'text', required: true },
                { name: 'pol_email', label: 'Email', type: 'email', required: true },
                { name: 'pol_phoneNumber', label: 'Phone Number', type: 'tel', required: false },
                { name: 'pol_dob', label: 'Date of Birth', type: 'date', required: false },
                { name: 'polConstituency', label: 'Constituency', type: 'text', required: true },
            ];
        }
        return fields;
    };

    const formFields = getFormFields();

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            py: 4,
            px: { xs: 2, md: 4 }
        }}>
            <StyledPaper elevation={8} sx={{ maxWidth: 700, mx: 'auto', p: { xs: 3, md: 5 }, my: 4 }}>
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
                            <EditIcon sx={{ fontSize: 40, color: 'white' }} />
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
                        Edit {userType.charAt(0).toUpperCase() + userType.slice(1)} Profile
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            fontWeight: 500,
                            opacity: 0.8
                        }}
                    >
                        Update your profile information
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        {formFields.map((field) => (
                            <Grid item xs={12} sm={6} key={field.name}>
                                <StyledTextField
                                    label={field.label}
                                    variant="outlined"
                                    fullWidth
                                    name={field.name}
                                    type={field.type}
                                    value={formData[field.name] || (field.type === 'date' && formData[field.name] ? formData[field.name].split('T')[0] : '')}
                                    onChange={handleChange}
                                    required={field.required}
                                    InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                                    disabled={field.name.includes('Username') && userType !== 'admin'}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="center" mt={5} gap={3}>
                        <StyledButton
                            type="submit"
                            variant="contained"
                            sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
                        >
                            Save Changes
                        </StyledButton>
                        <StyledButton
                            variant="outlined"
                            onClick={() => navigate(`/profile/${userType}/${idOrUsername}`)}
                            sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
                        >
                            Cancel
                        </StyledButton>
                    </Box>
                </Box>

                {message && (
                    <Box sx={{ 
                        mt: 3, 
                        p: 3, 
                        borderRadius: 2, 
                        background: 'linear-gradient(45deg, #4caf50 30%, #45a049 90%)', 
                        color: 'white' 
                    }}>
                        <Typography variant="body1" align="center" sx={{ fontWeight: 600 }}>
                            {message}
                        </Typography>
                    </Box>
                )}
                {error && (
                    <Box sx={{ 
                        mt: 3, 
                        p: 3, 
                        borderRadius: 2, 
                        background: 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)', 
                        color: 'white' 
                    }}>
                        <Typography variant="body1" align="center" sx={{ fontWeight: 600 }}>
                            {error}
                        </Typography>
                    </Box>
                )}
            </StyledPaper>
        </Box>
    );
}

export default EditProfilePage;