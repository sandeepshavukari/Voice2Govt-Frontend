// src/pages/Auth/AdminRegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { registerAdmin } from '../../api/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Paper, 
    Grid, 
    Alert,
    CircularProgress,
    IconButton,
    InputAdornment,
    LinearProgress,
    Chip,
    Divider,
    Avatar
} from '@mui/material';
import { 
    Visibility, 
    VisibilityOff, 
    CheckCircle, 
    Error,
    Person,
    Email,
    Phone,
    CalendarToday,
    Security,
    Add
} from '@mui/icons-material';

function AdminRegisterPage() {
    const [formData, setFormData] = useState({
        admUsername: '',
        admPassword: '',
        adm_firstName: '',
        adm_lastName: '',
        adm_email: '',
        adm_phoneNumber: '',
        adm_dob: '',
    });
    
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    
    const navigate = useNavigate();

    // Password strength calculation
    useEffect(() => {
        const password = formData.admPassword;
        const criteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        setPasswordCriteria(criteria);
        
        const strength = Object.values(criteria).filter(Boolean).length;
        setPasswordStrength(strength);
    }, [formData.admPassword]);

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        
        // Username validation
        if (!formData.admUsername.trim()) {
            newErrors.admUsername = 'Username is required';
        } else if (formData.admUsername.length < 3) {
            newErrors.admUsername = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.admUsername)) {
            newErrors.admUsername = 'Username can only contain letters, numbers, and underscores';
        }
        
        // Password validation
        if (!formData.admPassword) {
            newErrors.admPassword = 'Password is required';
        } else if (passwordStrength < 3) {
            newErrors.admPassword = 'Password must meet at least 3 criteria';
        }
        
        // Name validation
        if (!formData.adm_firstName.trim()) {
            newErrors.adm_firstName = 'First name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.adm_firstName)) {
            newErrors.adm_firstName = 'First name can only contain letters and spaces';
        }
        
        if (!formData.adm_lastName.trim()) {
            newErrors.adm_lastName = 'Last name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.adm_lastName)) {
            newErrors.adm_lastName = 'Last name can only contain letters and spaces';
        }
        
        // Email validation
        if (!formData.adm_email.trim()) {
            newErrors.adm_email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adm_email)) {
            newErrors.adm_email = 'Please enter a valid email address';
        }
        
        // Phone validation
        if (formData.adm_phoneNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.adm_phoneNumber.replace(/\s/g, ''))) {
            newErrors.adm_phoneNumber = 'Please enter a valid phone number';
        }
        
        // Date of birth validation
        if (formData.adm_dob) {
            const today = new Date();
            const dob = new Date(formData.adm_dob);
            const age = today.getFullYear() - dob.getFullYear();
            if (age < 18 || age > 100) {
                newErrors.adm_dob = 'Age must be between 18 and 100 years';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        
        if (!validateForm()) {
            setMessage('Please fix the errors in the form');
            return;
        }
        
        setLoading(true);
        try {
            const response = await registerAdmin(formData);
            setMessage(`Registration successful for ${response.admUsername}! Redirecting to login...`);
            setTimeout(() => {
                navigate('/admin/login');
            }, 2000);
        } catch (error) {
            setMessage(`Registration failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 1) return 'error';
        if (passwordStrength <= 2) return 'warning';
        if (passwordStrength <= 3) return 'info';
        return 'success';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 1) return 'Very Weak';
        if (passwordStrength <= 2) return 'Weak';
        if (passwordStrength <= 3) return 'Fair';
        if (passwordStrength <= 4) return 'Good';
        return 'Strong';
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#f5f5f5',
            py: 4
        }}>
            <Paper elevation={3} sx={{ 
                maxWidth: 600, 
                width: '100%', 
                mx: 2,
                borderRadius: 3,
                overflow: 'hidden'
            }}>
                {/* Header with Gradient */}
                <Box sx={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    p: 4,
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    {/* Circular Icon */}
                    <Avatar sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 2,
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '3px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        <Person sx={{ fontSize: 40 }} />
                        <Add sx={{ 
                            fontSize: 20, 
                            position: 'absolute', 
                            top: '5px', 
                            right: '5px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '50%',
                            color: '#667eea'
                        }} />
                    </Avatar>
                    
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        gutterBottom
                        sx={{ 
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        Admin Registration
                    </Typography>
                    
                    <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                        Join our administrative team and help manage the platform
                    </Typography>
                </Box>

                <Box sx={{ p: 4 }}>
                    {message && (
                        <Alert 
                            severity={message.includes('failed') ? 'error' : 'success'}
                            sx={{ mb: 3 }}
                            onClose={() => setMessage('')}
                        >
                            {message}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Account Information */}
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: '600' }}>
                                    Account Information
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Username *"
                                    variant="outlined"
                                    fullWidth
                                    name="admUsername"
                                    value={formData.admUsername}
                                    onChange={handleChange}
                                    error={!!errors.admUsername}
                                    helperText={errors.admUsername}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Password *"
                                    variant="outlined"
                                    fullWidth
                                    name="admPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.admPassword}
                                    onChange={handleChange}
                                    error={!!errors.admPassword}
                                    helperText={errors.admPassword}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            </Grid>

                            {/* Password Strength Indicator */}
                            {formData.admPassword && (
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Typography variant="body2" sx={{ mr: 1 }}>
                                                Password Strength:
                                            </Typography>
                                            <Chip 
                                                label={getPasswordStrengthText()}
                                                color={getPasswordStrengthColor()}
                                                size="small"
                                            />
                                        </Box>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={(passwordStrength / 5) * 100}
                                            color={getPasswordStrengthColor()}
                                            sx={{ height: 6, borderRadius: 3 }}
                                        />
                                    </Box>
                                    
                                    <Grid container spacing={1}>
                                        {Object.entries(passwordCriteria).map(([criterion, met]) => (
                                            <Grid item xs={12} sm={6} key={criterion}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {met ? (
                                                        <CheckCircle color="success" sx={{ fontSize: 16, mr: 1 }} />
                                                    ) : (
                                                        <Error color="error" sx={{ fontSize: 16, mr: 1 }} />
                                                    )}
                                                    <Typography variant="caption" color={met ? 'success.main' : 'error.main'}>
                                                        {criterion === 'length' && 'At least 8 characters'}
                                                        {criterion === 'uppercase' && 'One uppercase letter'}
                                                        {criterion === 'lowercase' && 'One lowercase letter'}
                                                        {criterion === 'number' && 'One number'}
                                                        {criterion === 'special' && 'One special character'}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            )}

                            {/* Personal Information */}
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: '600' }}>
                                    Personal Information
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name *"
                                    variant="outlined"
                                    fullWidth
                                    name="adm_firstName"
                                    value={formData.adm_firstName}
                                    onChange={handleChange}
                                    error={!!errors.adm_firstName}
                                    helperText={errors.adm_firstName}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last Name *"
                                    variant="outlined"
                                    fullWidth
                                    name="adm_lastName"
                                    value={formData.adm_lastName}
                                    onChange={handleChange}
                                    error={!!errors.adm_lastName}
                                    helperText={errors.adm_lastName}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email *"
                                    variant="outlined"
                                    fullWidth
                                    name="adm_email"
                                    type="email"
                                    value={formData.adm_email}
                                    onChange={handleChange}
                                    error={!!errors.adm_email}
                                    helperText={errors.adm_email}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    name="adm_phoneNumber"
                                    type="tel"
                                    value={formData.adm_phoneNumber}
                                    onChange={handleChange}
                                    error={!!errors.adm_phoneNumber}
                                    helperText={errors.adm_phoneNumber}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date of Birth"
                                    variant="outlined"
                                    fullWidth
                                    name="adm_dob"
                                    type="date"
                                    value={formData.adm_dob}
                                    onChange={handleChange}
                                    error={!!errors.adm_dob}
                                    helperText={errors.adm_dob}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{ 
                                mt: 4, 
                                mb: 2, 
                                py: 1.5, 
                                fontSize: '1.1rem',
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                },
                                '&:disabled': {
                                    background: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)',
                                }
                            }}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {loading ? 'Creating Account...' : 'Register as Admin'}
                        </Button>
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link 
                                to="/admin/login" 
                                style={{ 
                                    textDecoration: 'none', 
                                    color: '#667eea', 
                                    fontWeight: 'medium' 
                                }}
                            >
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default AdminRegisterPage;