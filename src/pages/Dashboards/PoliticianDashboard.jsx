// src/pages/Dashboards/PoliticianDashboard.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import { getIssuesForPolitician, updateIssueStatus, getPoliticianInProgressIssues, getPoliticianResolvedIssues, getPoliticianPendingIssues } from '../../api/apiService';
import IssueList from '../../components/IssueList';
import IssueDetailsModal from '../../components/IssueDetailsModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
    Box, Typography, Button, Paper,
    ToggleButtonGroup, ToggleButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
    Chip, Avatar, Card, CardContent, Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    borderRadius: '12px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&.Mui-selected': {
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        '&:hover': {
            background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)'
        }
    },
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
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

function PoliticianDashboard() {
    const { user } = useContext(AuthContext);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
    });

    const fetchPoliticianIssues = async (currentFilter = 'all') => {
        setLoading(true);
        setError('');
        try {
            let fetchedIssues;
            if (currentFilter === 'all') {
                fetchedIssues = await getIssuesForPolitician(user.username);
            } else if (currentFilter === 'pending') {
                fetchedIssues = await getPoliticianPendingIssues(user.username);
            } else if (currentFilter === 'in-progress') {
                fetchedIssues = await getPoliticianInProgressIssues(user.username);
            } else if (currentFilter === 'resolved') {
                fetchedIssues = await getPoliticianResolvedIssues(user.username);
            }
            setIssues(fetchedIssues);

            // Calculate stats
            const allIssues = await getIssuesForPolitician(user.username);
            setStats({
                total: allIssues.length,
                pending: allIssues.filter(issue => issue.status === 'Pending').length,
                inProgress: allIssues.filter(issue => issue.status === 'In-Progress').length,
                resolved: allIssues.filter(issue => issue.status === 'Resolved').length
            });
        } catch (err) {
            console.error('Error fetching issues:', err);
            setError('Failed to load issues. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.username) {
            fetchPoliticianIssues(filter);
        }
    }, [user, filter]);

    const handleConfirmUpdateStatus = (issueId, newStatus) => {
        setSelectedIssueId(issueId);
        setNewStatus(newStatus);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
        setSelectedIssueId(null);
        setNewStatus('');
    };

    const handleExecuteUpdate = async () => {
        try {
            await updateIssueStatus(selectedIssueId, newStatus);
            setConfirmDialogOpen(false);
            setSelectedIssueId(null);
            setNewStatus('');
            fetchPoliticianIssues(filter);
        } catch (err) {
            console.error('Error updating issue status:', err);
            setError('Failed to update issue status. Please try again.');
        }
    };

    const getFilterTitle = () => {
        switch (filter) {
            case 'all': return 'All Issues';
            case 'pending': return 'Pending Issues';
            case 'in-progress': return 'In-Progress Issues';
            case 'resolved': return 'Resolved Issues';
            default: return 'All Issues';
        }
    };

    const getEmptyMessage = () => {
        switch (filter) {
            case 'all': return 'No issues assigned to you yet.';
            case 'pending': return 'No pending issues found.';
            case 'in-progress': return 'No issues currently in progress.';
            case 'resolved': return 'No resolved issues found.';
            default: return 'No issues found.';
        }
    };

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
                        Politician Dashboard
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            fontWeight: 500,
                            opacity: 0.8
                        }}
                    >
                        Manage and track issues assigned to you
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

                {/* Filter Toggle */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <ToggleButtonGroup
                        value={filter}
                        exclusive
                        onChange={(event, newFilter) => {
                            if (newFilter !== null) {
                                setFilter(newFilter);
                            }
                        }}
                        aria-label="issue filter"
                        sx={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '15px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            p: 0.5
                        }}
                    >
                        <StyledToggleButton value="all" aria-label="all issues">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AssignmentIcon sx={{ fontSize: 20 }} />
                                All
                            </Box>
                        </StyledToggleButton>
                        <StyledToggleButton value="pending" aria-label="pending issues">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PendingIcon sx={{ fontSize: 20 }} />
                                Pending
                            </Box>
                        </StyledToggleButton>
                        <StyledToggleButton value="in-progress" aria-label="in-progress issues">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon sx={{ fontSize: 20 }} />
                                In Progress
                            </Box>
                        </StyledToggleButton>
                        <StyledToggleButton value="resolved" aria-label="resolved issues">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleIcon sx={{ fontSize: 20 }} />
                                Resolved
                            </Box>
                        </StyledToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {/* Error Message */}
                {error && (
                    <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: 'error.light', border: 1, borderColor: 'error.main' }}>
                        <Typography variant="body1" color="error.main" sx={{ fontWeight: 600 }}>
                            {error}
                        </Typography>
                    </Box>
                )}

                {/* Issues List */}
                <LoadingSpinner isLoading={loading} message="Loading issues data...">
                    <IssueList
                        issues={issues}
                        title={getFilterTitle()}
                        emptyMessage={getEmptyMessage()}
                        onUpdateStatus={handleConfirmUpdateStatus}
                        showPoliticianDetails={false}
                        showActions={true}
                    />
                </LoadingSpinner>
            </StyledPaper>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
                <DialogTitle>Confirm Status Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to update the status of this issue to "{newStatus}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
                    <StyledButton onClick={handleExecuteUpdate} variant="contained">
                        Update
                    </StyledButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default PoliticianDashboard;