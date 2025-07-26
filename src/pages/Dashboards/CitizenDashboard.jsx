// src/pages/Dashboards/CitizenDashboard.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import { createCitizenIssue, getIssuesByCitizenUsername } from '../../api/apiService';
import IssueList from '../../components/IssueList';
import { Box, Typography, TextField, Button, Paper, InputLabel, Input,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// Removed useNavigate import if it was only for the View Profile button

function CitizenDashboard() {
    const { user /* Removed handleLogout */ } = useContext(AuthContext); // Removed handleLogout
    const [issueDescription, setIssueDescription] = useState('');
    const [issueImage, setIssueImage] = useState(null);
    const [submitMessage, setSubmitMessage] = useState('');
    const [citizenIssues, setCitizenIssues] = useState([]);
    const [fetchMessage, setFetchMessage] = useState('');

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedIssueDetails, setSelectedIssueDetails] = useState(null);
    // Removed navigate if it was only for View Profile button


    const fetchCitizenIssues = async () => {
        if (!user || !user.username) {
            setFetchMessage("User not logged in or username not available.");
            return;
        }
        try {
            setFetchMessage('');
            const issues = await getIssuesByCitizenUsername(user.username);
            setCitizenIssues(issues);
        } catch (error) {
            setFetchMessage(`Error fetching your issues: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchCitizenIssues();
    }, [user]);

    const handleIssueSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage('');

        if (!user || !user.username) {
            setSubmitMessage("Error: Citizen not logged in.");
            return;
        }

        if (!issueDescription.trim()) {
            setSubmitMessage("Issue description cannot be empty.");
            return;
        }

        const formData = new FormData();
        formData.append('citizenUsername', user.username);
        formData.append('issueDescription', issueDescription);
        if (issueImage) {
            formData.append('issueImage', issueImage);
        }

        try {
            await createCitizenIssue(formData);
            setSubmitMessage('Issue submitted successfully!');
            setIssueDescription('');
            setIssueImage(null);
            e.target.reset();
            fetchCitizenIssues();
        } catch (error) {
            setSubmitMessage(`Failed to submit issue: ${error.message}`);
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

    if (!user || user.type !== 'citizen') {
        return <Typography variant="h5" color="error" align="center" sx={{ mt: 5 }}>Access Denied.</Typography>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 4 }}>
                Citizen Dashboard - Welcome, {user.firstName} {user.lastName}!
            </Typography>
            <Box display="flex" justifyContent="flex-end" mb={3}>
                {/* Removed View My Profile Button */}
                {/* Removed Logout Button */}
            </Box>
            {submitMessage && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mb: 3, p: 2, borderRadius: 1, color: submitMessage.includes('Failed') ? 'error.main' : 'success.main', bgcolor: submitMessage.includes('Failed') ? 'error.light' : 'success.light', border: 1, borderColor: submitMessage.includes('Failed') ? 'error.main' : 'success.main' }}
                >
                    {submitMessage}
                </Typography>
            )}

            <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                    Submit a New Issue
                </Typography>
                <Box component="form" onSubmit={handleIssueSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Issue Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        required
                    />
                    <Box>
                        <InputLabel htmlFor="issue-image" sx={{ mb: 1, fontWeight: 'medium' }}>Upload Image (Optional):</InputLabel>
                        <Input
                            id="issue-image"
                            type="file"
                            onChange={(e) => setIssueImage(e.target.files[0])}
                            inputProps={{ accept: "image/*" }}
                            fullWidth
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ py: 1.5, fontSize: '1.1rem' }}
                    >
                        Submit Issue
                    </Button>
                </Box>
            </Paper>

            <IssueList
                issues={citizenIssues}
                title="Your Submitted Issues"
                emptyMessage={fetchMessage || "No issues submitted yet."}
                showPoliticianDetails={true}
                showActions={false}
                onOpenDetails={handleOpenDetailsDialog}
            />

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

export default CitizenDashboard;