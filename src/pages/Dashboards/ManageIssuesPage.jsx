// src/pages/Dashboards/ManageIssuesPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { getAllCitizenIssues, deleteCitizenIssue } from '../../api/apiService';
import IssueList from '../../components/IssueList';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
    Box, Typography, Button, Paper,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ManageIssuesPage() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [allIssues, setAllIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // State for delete confirmation dialog
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [issueToDeleteId, setIssueToDeleteId] = useState(null);

    const fetchAllIssues = async () => {
        setLoading(true);
        try {
            setMessage('');
            const data = await getAllCitizenIssues();
            setAllIssues(data);
        } catch (error) {
            setMessage(`Error fetching all issues: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Handler to open the confirmation dialog
    const handleOpenConfirmDeleteDialog = (issueId) => {
        setIssueToDeleteId(issueId);
        setOpenConfirmDeleteDialog(true);
    };

    // Handler to close the confirmation dialog
    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDeleteDialog(false);
        setIssueToDeleteId(null);
    };

    // Handler to execute the delete operation after confirmation
    const handleExecuteDeleteIssue = async () => {
        if (issueToDeleteId === null) return; // Should not happen if dialog is opened correctly

        try {
            setMessage('');
            await deleteCitizenIssue(issueToDeleteId);
            setMessage(`Issue #${issueToDeleteId} deleted successfully.`);
            fetchAllIssues(); // Refresh the list
            handleCloseConfirmDeleteDialog(); // Close dialog on success
        } catch (error) {
            setMessage(`Error deleting issue: ${error.message}`);
            handleCloseConfirmDeleteDialog(); // Close dialog even on error
        }
    };

    // Handler for editing issues (placeholder for future implementation)
    const handleEditIssue = (issueId) => {
        // TODO: Implement edit functionality
        console.log('Edit issue:', issueId);
        setMessage('Edit functionality coming soon!');
    };

    useEffect(() => {
        if (user && user.type === 'admin') {
            fetchAllIssues();
        }
    }, [user]);

    if (!user || user.type !== 'admin') {
        return <Typography variant="h5" color="error" align="center" sx={{ mt: 5 }}>Access Denied.</Typography>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 4 }}>
                Global Issue Management
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button variant="outlined" onClick={() => navigate('/admin/dashboard')}>
                    Back to Admin Panel
                </Button>
            </Box>
            {message && (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ mb: 3, p: 2, borderRadius: 1, color: message.includes('Error') || message.includes('failed') ? 'error.main' : 'success.main', bgcolor: message.includes('Error') || message.includes('failed') ? 'error.light' : 'success.light', border: 1, borderColor: message.includes('Error') || message.includes('failed') ? 'error.main' : 'success.main' }}
                >
                    {message}
                </Typography>
            )}

            <LoadingSpinner isLoading={loading} message="Loading issues data...">
                <IssueList
                    issues={allIssues}
                    title="All System Issues"
                    emptyMessage="No issues found across the system."
                    onDelete={handleOpenConfirmDeleteDialog}
                    onEdit={handleEditIssue}
                    showPoliticianDetails={true}
                    showActions={true}
                />
            </LoadingSpinner>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openConfirmDeleteDialog}
                onClose={handleCloseConfirmDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Issue Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete Issue #**{issueToDeleteId}**? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDeleteDialog} color="primary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleExecuteDeleteIssue} color="error" variant="contained" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ManageIssuesPage;