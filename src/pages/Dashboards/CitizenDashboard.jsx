// src/pages/Dashboards/CitizenDashboard.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import { getIssuesByCitizenUsername, createCitizenIssue } from '../../api/apiService';
import IssueList from '../../components/IssueList';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
    Box, Typography, Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem,
    Card, CardContent, Grid, Chip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions,
    IconButton, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
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

const StatsCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
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
        borderRadius: '15px 15px 0 0'
    },
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px',
    fontWeight: 600,
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)'
    }
}));

function CitizenDashboard() {
    const { user } = useContext(AuthContext);
    const [citizenIssues, setCitizenIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [fetchMessage, setFetchMessage] = useState('');
    const [showIssueForm, setShowIssueForm] = useState(false);
    const [showIssueList, setShowIssueList] = useState(false);

    // Issue form state
    const [issueTitle, setIssueTitle] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [issueImage, setIssueImage] = useState(null);

    // Stats state
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
    });

    const fetchCitizenIssues = async () => {
        setLoading(true);
        try {
            setFetchMessage('');
            const data = await getIssuesByCitizenUsername(user.username);
            setCitizenIssues(data);

            // Calculate stats
            setStats({
                total: data.length,
                pending: data.filter(issue => issue.status === 'Pending').length,
                inProgress: data.filter(issue => issue.status === 'In-Progress').length,
                resolved: data.filter(issue => issue.status === 'Resolved').length
            });
        } catch (error) {
            setFetchMessage(`Error fetching issues: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleIssueSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage('');

        if (!user || !user.username) {
            setSubmitMessage("User session not found. Please login again.");
            return;
        }

        if (!issueTitle.trim()) {
            setSubmitMessage("Issue title cannot be empty.");
            return;
        }

        if (!issueDescription.trim()) {
            setSubmitMessage("Issue description cannot be empty.");
            return;
        }

        const MAX_IMAGE_SIZE_MB = 5;
        const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
        if (issueImage && issueImage.size > MAX_IMAGE_SIZE_BYTES) {
            setSubmitMessage(`Error: Image size exceeds ${MAX_IMAGE_SIZE_MB}MB. Please choose a smaller image.`);
            return;
        }

        const formData = new FormData();
        formData.append('citizenUsername', user.username);
        formData.append('issueTitle', issueTitle);
        formData.append('issueDescription', issueDescription);
        if (issueImage) {
            formData.append('issueImage', issueImage);
        }

        try {
            await createCitizenIssue(formData);
            setSubmitMessage('Issue submitted successfully!');
            setIssueTitle('');
            setIssueDescription('');
            setIssueImage(null);
            e.target.reset();
            fetchCitizenIssues();
            setShowIssueForm(false);
            setShowIssueList(true);
        } catch (error) {
            setSubmitMessage(`Failed to submit issue: ${error.message}`);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIssueImage(file);
        }
    };

    useEffect(() => {
        if (user && user.username) {
            fetchCitizenIssues();
        }
    }, [user]);

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            py: 4,
            px: { xs: 2, md: 4 }
        }}>
            <StyledPaper elevation={8} sx={{ p: { xs: 3, md: 5 }, mb: 4 }}>
                {/* Header Section */}
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
                            <AssignmentIcon sx={{ fontSize: 40, color: 'white' }} />
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
                            letterSpacing: '0.5px'
                        }}
                    >
                        Citizen Dashboard
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            fontWeight: 500,
                            opacity: 0.8
                        }}
                    >
                        Submit and track your community issues
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={6} sm={3}>
                        <StatsCard elevation={3}>
                            <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: 'primary.main' }}>
                                    {stats.total}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Total Issues
                                </Typography>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatsCard elevation={3}>
                            <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: 'warning.main' }}>
                                    {stats.pending}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Pending
                                </Typography>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatsCard elevation={3}>
                            <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: 'info.main' }}>
                                    {stats.inProgress}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    In Progress
                                </Typography>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StatsCard elevation={3}>
                            <CardContent sx={{ textAlign: 'center', p: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: 'success.main' }}>
                                    {stats.resolved}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Resolved
                                </Typography>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                    <StyledButton
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setShowIssueForm(!showIssueForm);
                            setShowIssueList(false);
                        }}
                        sx={{ minWidth: 200 }}
                    >
                        {showIssueForm ? 'Cancel Submission' : 'Submit New Issue'}
                    </StyledButton>
                    
                    <StyledButton
                        variant="outlined"
                        onClick={() => {
                            setShowIssueList(!showIssueList);
                            setShowIssueForm(false);
                        }}
                        sx={{ 
                            minWidth: 200,
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': {
                                borderColor: 'primary.dark',
                                backgroundColor: 'primary.light',
                                color: 'primary.dark'
                            }
                        }}
                    >
                        {showIssueList ? 'Hide Issues' : 'View My Issues'}
                    </StyledButton>
                </Box>

                {/* Submit Message */}
                {submitMessage && (
                    <Alert 
                        severity={submitMessage.includes('Error') || submitMessage.includes('failed') ? 'error' : 'success'}
                        sx={{ mb: 3 }}
                        onClose={() => setSubmitMessage('')}
                    >
                        {submitMessage}
                    </Alert>
                )}

                {/* Issue Submission Form */}
                {showIssueForm && (
                    <StyledPaper elevation={3} sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                            Submit New Issue
                        </Typography>
                        <Box component="form" onSubmit={handleIssueSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                label="Issue Title"
                                value={issueTitle}
                                onChange={(e) => setIssueTitle(e.target.value)}
                                required
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        '&:hover': {
                                            background: 'rgba(255, 255, 255, 0.9)',
                                        },
                                        '&.Mui-focused': {
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            borderColor: 'primary.main',
                                        }
                                    }
                                }}
                            />
                            
                            <TextField
                                label="Issue Description"
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                                required
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        '&:hover': {
                                            background: 'rgba(255, 255, 255, 0.9)',
                                        },
                                        '&.Mui-focused': {
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            borderColor: 'primary.main',
                                        }
                                    }
                                }}
                            />
                            
                            <Box>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="issue-image-upload"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="issue-image-upload">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        sx={{
                                            borderRadius: '12px',
                                            borderColor: 'primary.main',
                                            color: 'primary.main',
                                            '&:hover': {
                                                borderColor: 'primary.dark',
                                                backgroundColor: 'primary.light',
                                                color: 'primary.dark'
                                            }
                                        }}
                                    >
                                        Upload Image (Optional)
                                    </Button>
                                </label>
                                {issueImage && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        Selected: {issueImage.name}
                                    </Typography>
                                )}
                            </Box>
                            
                            <StyledButton
                                type="submit"
                                variant="contained"
                                sx={{ alignSelf: 'flex-end', minWidth: 150 }}
                            >
                                Submit Issue
                            </StyledButton>
                        </Box>
                    </StyledPaper>
                )}

                {/* Issues List */}
                {showIssueList && (
                    <LoadingSpinner isLoading={loading} message="Loading your issues...">
                        <IssueList
                            issues={citizenIssues}
                            title="Your Submitted Issues"
                            emptyMessage={fetchMessage || "No issues submitted yet."}
                            showPoliticianDetails={true}
                            showActions={false}
                        />
                    </LoadingSpinner>
                )}
            </StyledPaper>
        </Box>
    );
}

export default CitizenDashboard;