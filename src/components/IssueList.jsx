import React, { useState } from 'react';
import IssueCard from './IssueCard';
import IssueDetailsModal from './IssueDetailsModal';
import { Box, Typography, Paper, Grid } from '@mui/material';
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

const EmptyStateBox = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px dashed rgba(102, 126, 234, 0.3)',
    padding: theme.spacing(4),
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: -20,
        right: -20,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'rgba(102, 126, 234, 0.1)',
        zIndex: 0
    }
}));

const IssueList = ({ issues, title, emptyMessage, onDelete, onUpdateStatus, showPoliticianDetails = false, showActions = false, onOpenDetails, onEdit }) => {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleCardClick = (issue) => {
        setSelectedIssue(issue);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedIssue(null);
    };

    const handleEditIssue = (issueId) => {
        if (onEdit) {
            onEdit(issueId);
        }
    };

    const handleDeleteIssue = (issueId) => {
        if (onDelete) {
            onDelete(issueId);
        }
    };

    return (
        <>
            <StyledPaper elevation={8} sx={{ p: { xs: 3, md: 5 }, mb: 5 }}>
                {title && (
                    <Typography 
                        variant="h4" 
                        component="h2" 
                        gutterBottom 
                        align="center" 
                        sx={{ 
                            fontWeight: 700, 
                            color: 'primary.main', 
                            mb: { xs: 3, md: 5 },
                            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {title}
                    </Typography>
                )}

                {issues.length === 0 ? (
                    <EmptyStateBox>
                        <Typography 
                            variant="h6" 
                            color="text.secondary"
                            sx={{ 
                                fontWeight: 600,
                                mb: 1,
                                position: 'relative',
                                zIndex: 1
                            }}
                        >
                            {emptyMessage}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="text.disabled" 
                            sx={{ 
                                mt: 1,
                                position: 'relative',
                                zIndex: 1,
                                opacity: 0.8
                            }}
                        >
                            There are no items to display under this category.
                        </Typography>
                    </EmptyStateBox>
                ) : (
                    <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
                        {issues.map((issue) => (
                            <Grid item xs={12} sm={6} lg={4} key={issue.issueId}>
                                <IssueCard
                                    issue={issue}
                                    onDelete={onDelete}
                                    onUpdateStatus={onUpdateStatus}
                                    showPoliticianDetails={showPoliticianDetails}
                                    showActions={showActions}
                                    onOpenDetails={handleCardClick}
                                    onEdit={onEdit}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </StyledPaper>

            {/* Issue Details Modal */}
            <IssueDetailsModal
                open={modalOpen}
                onClose={handleCloseModal}
                issue={selectedIssue}
                onEdit={handleEditIssue}
                onDelete={handleDeleteIssue}
                onUpdateStatus={onUpdateStatus}
                showActions={showActions}
            />
        </>
    );
};

export default IssueList;