// src/components/IssueCard.jsx
import React, { useState } from 'react';
import {
    Card, CardContent, CardActions, CardMedia,
    Typography, Button, Select, MenuItem, FormControl, Box, InputLabel, Chip, Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
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
    },
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        '& .card-media': {
            transform: 'scale(1.05)'
        }
    }
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        },
        '&.Mui-focused': {
            background: 'rgba(255, 255, 255, 0.95)',
            borderColor: 'primary.main',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
        }
    }
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
    borderRadius: '12px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    ...(variant === 'contained' && {
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        '&:hover': {
            background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)'
        }
    }),
    ...(variant === 'outlined' && {
        borderColor: 'primary.main',
        color: 'primary.main',
        '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'primary.light',
            color: 'primary.dark'
        }
    })
}));

// Add 'onEdit' to props
const IssueCard = ({ issue, onDelete, onUpdateStatus, showPoliticianDetails = false, showActions = false, onOpenDetails, onEdit }) => {
    const [selectedStatus, setSelectedStatus] = useState(issue.status);
    const [showUpdateButton, setShowUpdateButton] = useState(false);

    let statusColor = 'text.secondary';
    switch (issue.status) {
        case 'Pending':
            statusColor = 'warning.main';
            break;
        case 'In-Progress':
            statusColor = 'info.main';
            break;
        case 'Resolved':
            statusColor = 'success.main';
            break;
        default:
            statusColor = 'text.secondary';
            break;
    }

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setShowUpdateButton(event.target.value !== issue.status);
    };

    const handleUpdateClick = () => {
        if (onUpdateStatus) {
            onUpdateStatus(issue.issueId, selectedStatus);
            setShowUpdateButton(false);
        }
    };

    const getSubject = (description, maxLength = 60) => {
        if (!description) return '';
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    };

    const handleCardClick = () => {
        if (onOpenDetails) {
            onOpenDetails(issue);
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

    return (
        <StyledCard
            sx={{
                width: { xs: '100%', sm: 300, md: 320 },
                height: 420,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
            onClick={handleCardClick}
        >
            {issue.issueImage && (
                <CardMedia
                    component="img"
                    height="140"
                    image={`data:image/jpeg;base64,${issue.issueImage}`}
                    alt={`Issue #${issue.issueId} image`}
                    sx={{ 
                        objectFit: 'cover', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                        transition: 'transform 0.3s ease'
                    }}
                    className="card-media"
                />
            )}

            <CardContent
                sx={{
                    flexGrow: 1,
                    py: 2,
                    px: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        mb: 1, 
                        fontWeight: 700, 
                        color: 'primary.dark',
                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {issue.issueTitle || getSubject(issue.issueDescription) || 'No Title'}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontWeight: 600 }}>
                    Issue #{issue.issueId}
                </Typography>

                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                        mb: 2, 
                        textAlign: 'justify', 
                        wordBreak: 'break-word', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.5
                    }}
                >
                    {issue.issueDescription}
                </Typography>
            </CardContent>

            <Box sx={{ 
                p: 3, 
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)'
            }}>
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 20, height: 20, bgcolor: 'primary.main', fontSize: '0.7rem' }}>
                        {citizenDisplayName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                        Submitted by: <Typography component="span" sx={{ fontWeight: 600 }}>{citizenDisplayName}</Typography>
                    </Typography>
                </Box>
                {showPoliticianDetails && (
                    <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 20, height: 20, bgcolor: 'info.main', fontSize: '0.7rem' }}>
                            {politicianFullName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" color="text.secondary">
                            Assigned Politician: <Typography component="span" sx={{ fontWeight: 600 }}>{politicianFullName || 'N/A'}</Typography>
                        </Typography>
                    </Box>
                )}

                <Box sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        Status:
                    </Typography>
                    <Chip
                        label={issue.status}
                        size="small"
                        color={
                            issue.status === 'Pending' ? 'warning' :
                            issue.status === 'In-Progress' ? 'info' :
                            issue.status === 'Resolved' ? 'success' : 'default'
                        }
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                    />
                </Box>

                {showActions && (
                    <CardActions sx={{ p: 0, justifyContent: 'flex-start', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', mt: 2 }}>
                        {onEdit && (
                            <ActionButton
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={(e) => { e.stopPropagation(); onEdit(issue.issueId); }}
                                sx={{ py: 0.8, px: 2, flexShrink: 0 }}
                            >
                                Edit
                            </ActionButton>
                        )}

                        {onUpdateStatus && (
                            <FormControl fullWidth={false} sx={{ minWidth: 120 }}>
                                <InputLabel id={`status-select-label-${issue.issueId}`} size="small" sx={{ top: -5 }}>Status</InputLabel>
                                <StyledSelect
                                    labelId={`status-select-label-${issue.issueId}`}
                                    id={`status-select-${issue.issueId}`}
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                    displayEmpty
                                    size="small"
                                    label="Status"
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In-Progress">In-Progress</MenuItem>
                                    <MenuItem value="Resolved">Resolved</MenuItem>
                                </StyledSelect>
                            </FormControl>
                        )}
                        {showUpdateButton && (
                            <ActionButton
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={(e) => { e.stopPropagation(); handleUpdateClick(); }}
                                sx={{ py: 0.8, px: 2, flexShrink: 0 }}
                            >
                                Update
                            </ActionButton>
                        )}
                        {onDelete && (
                            <ActionButton
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={(e) => { e.stopPropagation(); onDelete(issue.issueId); }}
                                sx={{ py: 0.8, px: 2, flexShrink: 0 }}
                            >
                                Delete
                            </ActionButton>
                        )}
                    </CardActions>
                )}
            </Box>
        </StyledCard>
    );
};

export default IssueCard;