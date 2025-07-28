// src/components/IssueDetailsModal.jsx
import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Typography, Button, Box, Chip, Avatar, Divider,
    IconButton, Card, CardContent, Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '800px',
        width: '90vw',
        maxHeight: '90vh',
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
    }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    padding: theme.spacing(3, 4),
    '& .MuiTypography-root': {
        fontWeight: 700,
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    }
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(4),
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)'
}));

const InfoCard = styled(Card)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)'
    }
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    }
}));

const IssueDetailsModal = ({ open, onClose, issue, onEdit, onDelete, onUpdateStatus, showActions = false }) => {
    if (!issue) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'warning';
            case 'In-Progress': return 'info';
            case 'Resolved': return 'success';
            default: return 'default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return '⏳';
            case 'In-Progress': return '🔄';
            case 'Resolved': return '✅';
            default: return '📋';
        }
    };

    let citizenDisplayName = 'N/A';
    if (issue.citizen && (issue.citizen.cti_firstName || issue.citizen.cti_lastName)) {
        citizenDisplayName = `${issue.citizen.cti_firstName || ''} ${issue.citizen.cti_lastName || ''}`.trim();
    } else if (issue.citizen && (issue.citizen.firstName || issue.citizen.lastName)) {
        citizenDisplayName = `${issue.citizen.firstName || ''} ${issue.citizen.lastName || ''}`.trim();
    } else if (issue.citizenUsername) {
        citizenDisplayName = issue.citizenUsername;
    } else if (issue.citizen && issue.citizen.ctiUsername) {
        citizenDisplayName = issue.citizen.ctiUsername;
    }

    const politicianFullName = issue.politician
        ? `${issue.politician.pol_firstName || ''} ${issue.politician.pol_lastName || ''}`.trim()
        : '';

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    maxHeight: '90vh',
                    overflow: 'hidden'
                }
            }}
        >
            <StyledDialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="div">
                        Issue #{issue.issueId} - {issue.issueTitle || 'No Title'}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: 'primary.main',
                            '&:hover': {
                                background: 'rgba(102, 126, 234, 0.1)',
                                transform: 'scale(1.1)'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </StyledDialogTitle>

            <StyledDialogContent>
                <Grid container spacing={3}>
                    {/* Issue Image */}
                    {issue.issueImage && (
                        <Grid item xs={12}>
                            <Box sx={{ 
                                borderRadius: '15px', 
                                overflow: 'hidden',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)'
                            }}>
                                <img
                                    src={`data:image/jpeg;base64,${issue.issueImage}`}
                                    alt={`Issue #${issue.issueId} image`}
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                            </Box>
                        </Grid>
                    )}

                    {/* Status and Basic Info */}
                    <Grid item xs={12} md={6}>
                        <InfoCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        Status
                                    </Typography>
                                    <Chip
                                        label={`${getStatusIcon(issue.status)} ${issue.status}`}
                                        color={getStatusColor(issue.status)}
                                        variant="filled"
                                        sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                                    />
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        Created: {formatDate(issue.createdAt || issue.issueDate)}
                                    </Typography>
                                </Box>
                                
                                {issue.updatedAt && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            Updated: {formatDate(issue.updatedAt)}
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </InfoCard>
                    </Grid>

                    {/* User Information */}
                    <Grid item xs={12} md={6}>
                        <InfoCard>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    User Information
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                                        <PersonIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {citizenDisplayName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Citizen
                                        </Typography>
                                    </Box>
                                </Box>

                                {politicianFullName && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'info.main', width: 40, height: 40 }}>
                                            <AssignmentIcon />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {politicianFullName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Assigned Politician
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </InfoCard>
                    </Grid>

                    {/* Issue Description */}
                    <Grid item xs={12}>
                        <InfoCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <DescriptionIcon sx={{ color: 'primary.main' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        Issue Description
                                    </Typography>
                                </Box>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        lineHeight: 1.6,
                                        textAlign: 'justify',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {issue.issueDescription || 'No description provided.'}
                                </Typography>
                            </CardContent>
                        </InfoCard>
                    </Grid>

                    {/* Additional Details */}
                    {(issue.location || issue.category || issue.priority) && (
                        <Grid item xs={12}>
                            <InfoCard>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                        Additional Details
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {issue.location && (
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <LocationOnIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        Location: <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            {issue.location}
                                                        </Typography>
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        )}
                                        {issue.category && (
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Category: <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                        {issue.category}
                                                    </Typography>
                                                </Typography>
                                            </Grid>
                                        )}
                                        {issue.priority && (
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Priority: <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                        {issue.priority}
                                                    </Typography>
                                                </Typography>
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </InfoCard>
                        </Grid>
                    )}
                </Grid>
            </StyledDialogContent>

            {/* Actions */}
            {showActions && (onEdit || onDelete || onUpdateStatus) && (
                <DialogActions sx={{ 
                    p: 3, 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    gap: 2
                }}>
                    <ActionButton
                        variant="outlined"
                        onClick={onClose}
                        sx={{ minWidth: 100 }}
                    >
                        Close
                    </ActionButton>
                    
                    {onEdit && (
                        <ActionButton
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                onEdit(issue.issueId);
                                onClose();
                            }}
                            sx={{ 
                                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                minWidth: 100
                            }}
                        >
                            Edit Issue
                        </ActionButton>
                    )}
                    
                    {onDelete && (
                        <ActionButton
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                onDelete(issue.issueId);
                                onClose();
                            }}
                            sx={{ minWidth: 100 }}
                        >
                            Delete Issue
                        </ActionButton>
                    )}
                </DialogActions>
            )}
        </StyledDialog>
    );
};

export default IssueDetailsModal; 