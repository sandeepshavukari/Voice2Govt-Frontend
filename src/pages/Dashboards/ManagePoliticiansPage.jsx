// src/pages/Dashboards/ManagePoliticiansPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { getAllPoliticians, deletePolitician } from '../../api/apiService';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ManagePoliticiansPage() {
    const { user /* Removed handleLogout */ } = useContext(AuthContext); // Removed handleLogout
    const [message, setMessage] = useState('');
    const [politicians, setPoliticians] = useState([]);
    const navigate = useNavigate();

    const fetchPoliticians = async () => {
        try {
            setMessage('');
            const data = await getAllPoliticians();
            setPoliticians(data);
        } catch (error) {
            setMessage(`Error fetching politicians: ${error.message}`);
        }
    };

    const handleDeletePolitician = async (id) => {
        if (window.confirm("Are you sure you want to delete this politician?")) {
            try {
                setMessage('');
                await deletePolitician(id);
                setMessage('Politician deleted successfully.');
                fetchPoliticians();
            } catch (error) {
                setMessage(`Error deleting politician: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        if (user && user.type === 'admin') {
            fetchPoliticians();
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
                Politician Management
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button variant="outlined" onClick={() => navigate('/admin/dashboard')}>
                    Back to Admin Panel
                </Button>
                {/* Removed Logout Button */}
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
                    All Politicians
                </Typography>
                <Box display="flex" justifyContent="flex-start" mb={3}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/politician/register')} sx={{ py: 1, px: 3 }}>
                        Add New Politician
                    </Button>
                </Box>
                <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 1 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="politician management table">
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
                            {politicians.map((politician) => (
                                <TableRow key={politician.pol_id} hover>
                                    <TableCell sx={tableCellSx}>{politician.pol_id}</TableCell>
                                    <TableCell sx={tableCellSx}>{politician.polUsername}</TableCell>
                                    <TableCell sx={tableCellSx}>{politician.pol_firstName}</TableCell>
                                    <TableCell sx={tableCellSx}>{politician.polConstituency}</TableCell>
                                    <TableCell sx={tableCellSx}>
                                        <Button variant="contained" color="error" size="small" onClick={() => handleDeletePolitician(politician.pol_id)} sx={actionButtonSx}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default ManagePoliticiansPage;