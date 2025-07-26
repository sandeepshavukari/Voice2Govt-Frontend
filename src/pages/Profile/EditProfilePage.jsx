// src/pages/Profile/EditProfilePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getAdminProfileByUsername, getCitizenProfileByUsername, getPoliticianProfileByUsername,
    updateAdminProfile, updateCitizenProfile, updatePoliticianProfile
} from '../../api/apiService'; // Import new update functions
import { Box, Typography, TextField, Button, Paper, CircularProgress, Alert, Grid, InputLabel, Input } from '@mui/material';
import { AuthContext } from '../../App';

function EditProfilePage() {
    const { userType, idOrUsername } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext); // Access logged-in user info
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
            // Ensure logged-in user matches the profile being edited OR is an Admin
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
            let updatedProfile = null;
            // Assuming IDs are available in formData after fetching
            const profileId = formData.adm_id || formData.cti_id || formData.pol_id;

            if (!profileId) {
                throw new Error("Profile ID not found for update.");
            }

            if (userType === 'admin') {
                updatedProfile = await updateAdminProfile(profileId, formData);
            } else if (userType === 'citizen') {
                updatedProfile = await updateCitizenProfile(profileId, formData);
            } else if (userType === 'politician') {
                updatedProfile = await updatePoliticianProfile(profileId, formData);
            }

            setMessage(`Profile updated successfully!`);
            // Optionally, update the user context if it's their own profile
            if (user.type === userType && user.username === idOrUsername) {
                // If the updated DTO contains the username and other info, update context
                user.username = formData.admUsername || formData.ctiUsername || formData.polUsername;
                user.pol_id = formData.pol_id; // For politician
                // You might need to refetch the user context or pass more details from backend
            }
            navigate(`/profile/${userType}/${idOrUsername}`); // Go back to profile view
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError(`Failed to update profile: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading profile data...</Typography>
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

    // Determine fields to display based on userType
    const getFormFields = () => {
        let fields = [];
        if (userType === 'admin') {
            fields = [
                { name: 'admUsername', label: 'Username', type: 'text', required: true },
                { name: 'admPassword', label: 'Password', type: 'password', required: false }, // Handle password change separately/carefully
                { name: 'adm_firstName', label: 'First Name', type: 'text', required: true },
                { name: 'adm_lastName', label: 'Last Name', type: 'text', required: true },
                { name: 'adm_email', label: 'Email', type: 'email', required: true },
                { name: 'adm_phoneNumber', label: 'Phone Number', type: 'tel', required: false },
                { name: 'adm_dob', label: 'Date of Birth', type: 'date', required: false },
            ];
        } else if (userType === 'citizen') {
            fields = [
                { name: 'ctiUsername', label: 'Username', type: 'text', required: true },
                { name: 'ctiPassword', label: 'Password', type: 'password', required: false },
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
                { name: 'polPassword', label: 'Password', type: 'password', required: false },
                { name: 'pol_firstName', label: 'First Name', type: 'text', required: true },
                { name: 'pol_lastName', label: 'Last Name', type: 'text', required: true },
                { name: 'pol_email', label: 'Email', type: 'email', required: true },
                { name: 'pol_phoneNumber', label: 'Phone Number', type: 'tel', required: false },
                { name: 'pol_dob', label: 'Date of Birth', type: 'date', required: false },
                { name: 'polConstituency', label: 'Constituency', type: 'text', required: true },
            ];
        }
        // Filter out password field if not specifically for password change form
        return fields.filter(field => field.name.includes('Password') ? false : true); // Exclude password field for simplicity unless a dedicated change password form
    };

    const formFields = getFormFields();

    return (
        <Paper elevation={6} sx={{ maxWidth: 700, mx: 'auto', p: 4, borderRadius: 3, my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}>
                Edit {userType.charAt(0).toUpperCase() + userType.slice(1)} Profile
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    {formFields.map((field) => (
                        <Grid item xs={12} sm={6} key={field.name}>
                            <TextField
                                label={field.label}
                                variant="outlined"
                                fullWidth
                                name={field.name}
                                type={field.type}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required}
                                InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box display="flex" justifyContent="center" mt={4} gap={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ py: 1.5, px: 3, fontSize: '1.1rem' }}
                    >
                        Save Changes
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate(`/profile/${userType}/${idOrUsername}`)}
                        sx={{ py: 1.5, px: 3, fontSize: '1.1rem' }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
            {message && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mt: 3, p: 2, borderRadius: 1, color: 'success.main', bgcolor: 'success.light', border: 1, borderColor: 'success.main' }}
                >
                    {message}
                </Typography>
            )}
            {error && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mt: 3, p: 2, borderRadius: 1, color: 'error.main', bgcolor: 'error.light', border: 1, borderColor: 'error.main' }}
                >
                    {error}
                </Typography>
            )}
        </Paper>
    );
}

export default EditProfilePage;