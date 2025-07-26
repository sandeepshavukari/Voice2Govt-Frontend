// src/pages/Dashboards/PoliticianDashboard.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import { getIssuesForPolitician, updateIssueStatus, getPoliticianInProgressIssues, getPoliticianResolvedIssues, getPoliticianPendingIssues } from '../../api/apiService';
import IssueList from '../../components/IssueList';
import {
    Box, Typography, Button, Paper,
    ToggleButtonGroup, ToggleButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// Removed useNavigate import if it was only for View Profile button

function PoliticianDashboard() {
    const { user /* Removed handleLogout */ } = useContext(AuthContext); // Removed handleLogout
    const [issues, setIssues] = useState([]);
    const [message, setMessage] = useState('');
    const [filter, setFilter] = useState('all');

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [issueToUpdate, setIssueToUpdate] = useState(null);

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedIssueDetails, setSelectedIssueDetails] = useState(null);

    // Removed navigate if it was only for View Profile button

    const politicianId = user?.pol_id || localStorage.getItem('politicianId');

    const fetchPoliticianIssues = async (currentFilter = 'all') => {
        if (!user || !user.username || !politicianId) {
            setMessage("User not logged in, username, or politician ID not available. Please log in as a politician.");
            return;
        }
        try {
            setMessage('');
            let fetchedIssues;
            if (currentFilter === 'pending') {
                fetchedIssues = await getPoliticianPendingIssues(politicianId);
            } else if (currentFilter === 'inprogress') {
                fetchedIssues = await getPoliticianInProgressIssues(politicianId);
            } else if (currentFilter === 'resolved') {
                fetchedIssues = await getPoliticianResolvedIssues(politicianId);
            } else {
                fetchedIssues = await getIssuesForPolitician(user.username);
            }
            setIssues(fetchedIssues);
        } catch (error) {
            setMessage(`Error fetching issues: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchPoliticianIssues(filter);
    }, [user, filter, politicianId]);

    const handleConfirmUpdateStatus = (issueId, newStatus) => {
        setIssueToUpdate({ issueId, newStatus });
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setIssueToUpdate(null);
    };

    const handleExecuteUpdate = async () => {
        if (!issueToUpdate || !politicianId) return;

        const { issueId, newStatus } = issueToUpdate;

        try {
            setMessage('');
            await updateIssueStatus(politicianId, issueId, newStatus);
            setMessage(`Issue #${issueId} status updated to ${newStatus} successfully!`);
            fetchPoliticianIssues(filter);
            handleCloseConfirmDialog();
        } catch (error) {
            setMessage(`Failed to update status: ${error.message}`);
            handleCloseConfirmDialog();
        }
    };

    const handleOpenDetailsDialog = (issue) => {
        setSelectedIssueDetails(issue);
        setOpenDetailsDialog(true);
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
        setSelectedIssueDetails(null);
    };

    if (!user || user.type !== 'politician') {
        return <Typography variant="h5" color="error" align="center" sx={{ mt: 5 }}>Access Denied.</Typography>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 4 }}>
                Politician Dashboard - Welcome, {user.username}!
            </Typography>
            <Box display="flex" justifyContent="flex-end" mb={3}>
                {/* Removed View My Profile Button */}
                {/* Removed Logout Button */}
            </Box>
            {message && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mb: 3, p: 2, borderRadius: 1, color: message.includes('Failed') ? 'error.main' : 'success.main', bgcolor: message.includes('Failed') ? 'error.light' : 'success.light', border: 1, borderColor: message.includes('Failed') ? 'error.main' : 'success.main' }}
                >
                    {message}
                </Typography>
            )}

            <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                    Issues in Your Constituency
                </Typography>
                <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
                    <ToggleButtonGroup
                        value={filter}
                        exclusive
                        onChange={(event, newFilter) => {
                            if (newFilter !== null) {
                                setFilter(newFilter);
                            }
                        }}
                        aria-label="issue filter"
                    >
                        <ToggleButton value="all" aria-label="all issues">
                            All Issues
                        </ToggleButton>
                        <ToggleButton value="pending" aria-label="pending issues">
                            Pending
                        </ToggleButton>
                        <ToggleButton value="inprogress" aria-label="in progress issues">
                            In Progress
                        </ToggleButton>
                        <ToggleButton value="resolved" aria-label="resolved issues">
                            Resolved
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <IssueList
                    issues={issues}
                    title=""
                    emptyMessage="No issues found for your constituency or selected filter."
                    onUpdateStatus={handleConfirmUpdateStatus}
                    onOpenDetails={handleOpenDetailsDialog}
                    showPoliticianDetails={false}
                    showActions={true}
                />
            </Paper>

            <Dialog
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">{"Confirm Status Update"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Are you sure you want to update the status of Issue #{issueToUpdate?.issueId} to "{issueToUpdate?.newStatus}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleExecuteUpdate} color="primary" variant="contained" autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDetailsDialog}
                onClose={handleCloseDetailsDialog}
                maxWidth="sm"
                fullWidth
                aria-labelledby="issue-details-dialog-title"
            >
                <DialogTitle id="issue-details-dialog-title">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Issue #{selectedIssueDetails?.issueId}</Typography>
                        <IconButton aria-label="close" onClick={handleCloseDetailsDialog}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedIssueDetails?.issueImage && (
                        <Box sx={{ mb: 2, textAlign: 'center' }}>
                            <img
                                src={`data:image/jpeg;base64,${selectedIssueDetails.issueImage}`}
                                alt={`Issue #${selectedIssueDetails.issueId} image`}
                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
                            />
                        </Box>
                    )}
                    <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
                        Description:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'justify' }}>
                        {selectedIssueDetails?.issueDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Submitted by: <Typography component="span" sx={{ fontWeight: 'medium' }}>{selectedIssueDetails?.citizen?.ctiUsername || 'N/A'}</Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Assigned Politician: <Typography component="span" sx={{ fontWeight: 'medium' }}>{selectedIssueDetails?.politician?.pol_firstName} {selectedIssueDetails?.politician?.pol_lastName || 'N/A'}</Typography>
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold', color: 'text.primary' }}>
                        Current Status: <Typography component="span" sx={{ color: (theme) => {
                            switch (selectedIssueDetails?.status) {
                                case 'Pending': return theme.palette.warning.main;
                                case 'In-Progress': return theme.palette.info.main;
                                case 'Resolved': return theme.palette.success.main;
                                default: return theme.palette.text.secondary;
                            }
                        }, fontWeight: 'bold' }}>{selectedIssueDetails?.status}</Typography>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailsDialog} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default PoliticianDashboard;