// src/pages/Dashboards/ManageIssuesPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { getAllCitizenIssues, deleteCitizenIssue } from '../../api/apiService';
import IssueList from '../../components/IssueList';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ManageIssuesPage() {
    const { user /* Removed handleLogout */ } = useContext(AuthContext); // Removed handleLogout
    const [message, setMessage] = useState('');
    const [allIssues, setAllIssues] = useState([]);
    const navigate = useNavigate();

    const fetchAllIssues = async () => {
        try {
            setMessage('');
            const data = await getAllCitizenIssues();
            setAllIssues(data);
        } catch (error) {
            setMessage(`Error fetching all issues: ${error.message}`);
        }
    };

    const handleDeleteIssue = async (issueId) => {
        if (window.confirm(`Are you sure you want to delete issue #${issueId}?`)) {
            try {
                setMessage('');
                await deleteCitizenIssue(issueId);
                setMessage(`Issue #${issueId} deleted successfully.`);
                fetchAllIssues();
            } catch (error) {
                setMessage(`Error deleting issue: ${error.message}`);
            }
        }
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

            <IssueList
                issues={allIssues}
                title="All System Issues"
                emptyMessage="No issues found across the system."
                onDelete={handleDeleteIssue}
                showPoliticianDetails={true}
                showActions={true}
            />
        </Box>
    );
}

export default ManageIssuesPage;