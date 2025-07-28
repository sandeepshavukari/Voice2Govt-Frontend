// src/pages/Dashboards/ManageCitizensPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { getAllCitizens, deleteCitizen } from '../../api/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ManageCitizensPage() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [citizens, setCitizens] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // State for delete confirmation dialog
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [citizenToDeleteId, setCitizenToDeleteId] = useState(null);

    const fetchCitizens = async () => {
        setLoading(true);
        try {
            setMessage('');
            const data = await getAllCitizens();
            setCitizens(data);
        } catch (error) {
            setMessage(`Error fetching citizens: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Handler to open the confirmation dialog
    const handleOpenConfirmDeleteDialog = (id) => {
        setCitizenToDeleteId(id);
        setOpenConfirmDeleteDialog(true);
    };

    // Handler to close the confirmation dialog
    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDeleteDialog(false);
        setCitizenToDeleteId(null);
    };

    // Handler to execute the delete operation after confirmation
    const handleExecuteDeleteCitizen = async () => {
        if (citizenToDeleteId === null) return;

        try {
            setMessage('');
            await deleteCitizen(citizenToDeleteId);
            setMessage('Citizen deleted successfully.');
            fetchCitizens(); // Refresh the list
            handleCloseConfirmDeleteDialog();
        } catch (error) {
            setMessage(`Error deleting citizen: ${error.message}`);
            handleCloseConfirmDeleteDialog();
        }
    };

    // --- NEW: Handle Edit Citizen ---
    const handleEditCitizen = (citizenUsername) => {
        // Navigate to the EditProfilePage for the specific citizen
        navigate(`/profile/citizen/${citizenUsername}/edit`);
    };
    // --- END NEW ---

    useEffect(() => {
        if (user && user.type === 'admin') {
            fetchCitizens();
        }
    }, [user]);

    if (!user || user.type !== 'admin') {
        return <Typography variant="h5" color="error" align="center" sx={{ mt: 5 }}>Access Denied.</Typography>;
    }

    const tableCellHeaderSx = { fontWeight: 'bold', backgroundColor: 'action.hover', py: 1.5, px: 2 };
    const tableCellSx = { borderBottom: '1px solid #e0e0e0', py: 1.5, px: 2 };
    const actionButtonSx = { py: 0.5, px: 1.5, mr: 1 };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 4 }}>
                Citizen Management
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

            <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                    All Citizens
                </Typography>
                <Box display="flex" justifyContent="flex-start" mb={3}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/citizen/register')} sx={{ py: 1, px: 3 }}>
                        Add New Citizen
                    </Button>
                </Box>
                <LoadingSpinner isLoading={loading} message="Loading citizens data...">
                    <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 1 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="citizen management table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableCellHeaderSx}>ID</TableCell>
                                    <TableCell sx={tableCellHeaderSx}>Username</TableCell>
                                    <TableCell sx={tableCellHeaderSx}>First Name</TableCell>
                                    <TableCell sx={tableCellHeaderSx}>Constituency</TableCell>
                                    <TableCell sx={tableCellHeaderSx}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {citizens.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                No citizens found.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    citizens.map((citizen) => (
                                        <TableRow key={citizen.cti_id} hover>
                                            <TableCell sx={tableCellSx}>{citizen.cti_id}</TableCell>
                                            <TableCell sx={tableCellSx}>{citizen.ctiUsername}</TableCell>
                                            <TableCell sx={tableCellSx}>{citizen.cti_firstName}</TableCell> {/* Assuming cti_firstName is available */}
                                            <TableCell sx={tableCellSx}>{citizen.ctiConstituency}</TableCell>
                                            <TableCell sx={tableCellSx}>
                                                {/* --- NEW: EDIT BUTTON --- */}
                                                <Button
                                                    variant="outlined"
                                                    color="info"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditCitizen(citizen.ctiUsername);
                                                    }}
                                                    sx={actionButtonSx}
                                                >
                                                    Edit
                                                </Button>
                                                {/* --- END NEW --- */}
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenConfirmDeleteDialog(citizen.cti_id);
                                                    }}
                                                    sx={actionButtonSx}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </LoadingSpinner>
            </Paper>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openConfirmDeleteDialog}
                onClose={handleCloseConfirmDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this citizen (ID: {citizenToDeleteId})? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDeleteDialog} color="primary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleExecuteDeleteCitizen} color="error" variant="contained" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ManageCitizensPage;