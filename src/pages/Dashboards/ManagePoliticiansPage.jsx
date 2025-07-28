// src/pages/Dashboards/ManagePoliticiansPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllPoliticians, deletePolitician } from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
    Chip, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
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

const StyledTable = styled(Table)(({ theme }) => ({
    '& .MuiTableCell-root': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)'
        }
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
        background: 'rgba(255, 255, 255, 0.2)',
        fontWeight: 700,
        color: 'primary.dark',
        borderBottom: '2px solid rgba(102, 126, 234, 0.3)'
    }
}));

const StyledButton = styled(Button)(({ theme, variant, color }) => ({
    borderRadius: '8px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    ...(variant === 'contained' && color === 'error' && {
        background: 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)',
        boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)',
        '&:hover': {
            background: 'linear-gradient(45deg, #d32f2f 30%, #c62828 90%)'
        }
    }),
    ...(variant === 'outlined' && color === 'primary' && {
        borderColor: 'primary.main',
        color: 'primary.main',
        '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'primary.light',
            color: 'primary.dark'
        }
    })
}));

function ManagePoliticiansPage() {
    const [politicians, setPoliticians] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
    const [politicianToDelete, setPoliticianToDelete] = useState(null);
    const navigate = useNavigate();

    const fetchPoliticians = async () => {
        setLoading(true);
        setError('');
        try {
            const fetchedPoliticians = await getAllPoliticians();
            setPoliticians(fetchedPoliticians);
        } catch (err) {
            console.error('Error fetching politicians:', err);
            setError('Failed to load politicians. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPoliticians();
    }, []);

    const handleOpenConfirmDeleteDialog = (politician) => {
        setPoliticianToDelete(politician);
        setConfirmDeleteDialogOpen(true);
    };

    const handleCloseConfirmDeleteDialog = () => {
        setConfirmDeleteDialogOpen(false);
        setPoliticianToDelete(null);
    };

    const handleExecuteDeletePolitician = async () => {
        if (!politicianToDelete) return;

        try {
            await deletePolitician(politicianToDelete.pol_id);
            setConfirmDeleteDialogOpen(false);
            setPoliticianToDelete(null);
            fetchPoliticians();
        } catch (err) {
            console.error('Error deleting politician:', err);
            setError('Failed to delete politician. Please try again.');
        }
    };

    const handleEditPolitician = (politicianUsername) => {
        navigate(`/profile/politician/${politicianUsername}/edit`);
    };

    const handleViewPolitician = (politicianUsername) => {
        navigate(`/profile/politician/${politicianUsername}`);
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            py: 4,
            px: { xs: 2, md: 4 }
        }}>
            <StyledPaper elevation={8} sx={{ p: { xs: 3, md: 5 } }}>
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
                            <HowToVoteIcon sx={{ fontSize: 40, color: 'white' }} />
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
                        Manage Politicians
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ 
                            fontWeight: 500,
                            opacity: 0.8
                        }}
                    >
                        View and manage all registered politicians in the system
                    </Typography>
                </Box>

                {/* Error Display */}
                {error && (
                    <Box sx={{ 
                        mb: 4, 
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

                {/* Politicians Table */}
                <LoadingSpinner isLoading={loading} message="Loading politicians data...">
                    <TableContainer sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>Avatar</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Constituency</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {politicians.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                                            <Typography variant="h6" color="text.secondary">
                                                No politicians found.
                                            </Typography>
                                            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                                                There are no politicians registered in the system.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    politicians.map((politician) => (
                                        <TableRow key={politician.pol_id} hover>
                                            <TableCell>
                                                <Avatar sx={{ 
                                                    bgcolor: 'primary.main',
                                                    width: 40,
                                                    height: 40
                                                }}>
                                                    {politician.pol_firstName?.charAt(0).toUpperCase() || 'P'}
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                    {`${politician.pol_firstName || ''} ${politician.pol_lastName || ''}`.trim() || 'N/A'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={politician.polUsername} 
                                                    size="small"
                                                    sx={{ 
                                                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                                        color: 'white',
                                                        fontWeight: 600
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {politician.pol_email || 'N/A'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {politician.polConstituency || 'N/A'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                    <StyledButton
                                                        variant="outlined"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleViewPolitician(politician.polUsername)}
                                                        startIcon={<VisibilityIcon />}
                                                        sx={{ minWidth: 'auto', px: 1 }}
                                                    >
                                                        View
                                                    </StyledButton>
                                                    <StyledButton
                                                        variant="outlined"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleEditPolitician(politician.polUsername)}
                                                        startIcon={<EditIcon />}
                                                        sx={{ minWidth: 'auto', px: 1 }}
                                                    >
                                                        Edit
                                                    </StyledButton>
                                                    <StyledButton
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleOpenConfirmDeleteDialog(politician)}
                                                        startIcon={<DeleteIcon />}
                                                        sx={{ minWidth: 'auto', px: 1 }}
                                                    >
                                                        Delete
                                                    </StyledButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </StyledTable>
                    </TableContainer>
                </LoadingSpinner>
            </StyledPaper>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDeleteDialogOpen} onClose={handleCloseConfirmDeleteDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete politician "{politicianToDelete?.pol_firstName} {politicianToDelete?.pol_lastName}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDeleteDialog}>Cancel</Button>
                    <StyledButton 
                        onClick={handleExecuteDeletePolitician} 
                        variant="contained" 
                        color="error"
                    >
                        Delete
                    </StyledButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ManagePoliticiansPage;