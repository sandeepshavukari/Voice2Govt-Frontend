// src/pages/Dashboards/ManageAdminsPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { getAllAdmins, deleteAdmin } from '../../api/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle // Added Dialog components
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ManageAdminsPage() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // State for delete confirmation dialog
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [adminToDeleteId, setAdminToDeleteId] = useState(null);

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            setMessage('');
            const data = await getAllAdmins();
            setAdmins(data);
        } catch (error) {
            setMessage(`Error fetching admins: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Handler to open the confirmation dialog
    const handleOpenConfirmDeleteDialog = (id) => {
        setAdminToDeleteId(id);
        setOpenConfirmDeleteDialog(true);
    };

    // Handler to close the confirmation dialog
    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDeleteDialog(false);
        setAdminToDeleteId(null);
    };

    // Handler to execute the delete operation after confirmation
    const handleExecuteDeleteAdmin = async () => {
        if (adminToDeleteId === null) return;

        try {
            setMessage('');
            await deleteAdmin(adminToDeleteId);
            setMessage('Admin deleted successfully.');
            fetchAdmins(); // Refresh the list
            handleCloseConfirmDeleteDialog();
        } catch (error) {
            setMessage(`Error deleting admin: ${error.message}`);
            handleCloseConfirmDeleteDialog();
        }
    };

    // --- NEW: Handle Edit Admin ---
    const handleEditAdmin = (adminUsername) => {
        // Navigate to the EditProfilePage for the specific admin
        navigate(`/profile/admin/${adminUsername}/edit`);
    };
    // --- END NEW ---

    useEffect(() => {
        if (user && user.type === 'admin') {
            fetchAdmins();
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
                Admin Management
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
                    All Admins
                </Typography>
                <Box display="flex" justifyContent="flex-start" mb={3}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/admin/register')} sx={{ py: 1, px: 3 }}>
                        Add New Admin
                    </Button>
                </Box>
                <LoadingSpinner isLoading={loading} message="Loading admins data...">
                    <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 1 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="admin management table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableCellHeaderSx}>ID</TableCell>
                                    <TableCell sx={tableCellHeaderSx}>Username</TableCell>
                                    <TableCell sx={tableCellHeaderSx}>First Name</TableCell>
                                    <TableCell sx={tableCellHeaderSx}>Last Name</TableCell>
                                    <TableCell sx={tableCellHeaderSx}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {admins.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                No admins found.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    admins.map((admin) => (
                                        <TableRow key={admin.adm_id} hover>
                                            <TableCell sx={tableCellSx}>{admin.adm_id}</TableCell>
                                            <TableCell sx={tableCellSx}>{admin.admUsername}</TableCell>
                                            <TableCell sx={tableCellSx}>{admin.adm_firstName}</TableCell> {/* Assuming adm_firstName is available */}
                                            <TableCell sx={tableCellSx}>{admin.adm_lastName}</TableCell> {/* Assuming adm_lastName is available */}
                                            <TableCell sx={tableCellSx}>
                                                {/* --- NEW: EDIT BUTTON --- */}
                                                <Button
                                                    variant="outlined"
                                                    color="info"
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditAdmin(admin.admUsername);
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
                                                        handleOpenConfirmDeleteDialog(admin.adm_id);
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
                        Are you sure you want to delete this admin (ID: {adminToDeleteId})? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDeleteDialog} color="primary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleExecuteDeleteAdmin} color="error" variant="contained" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ManageAdminsPage;