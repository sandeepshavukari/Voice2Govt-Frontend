// // src/components/IssueCard.jsx
// import React, { useState } from 'react';
// import {
//     Card, CardContent, CardActions, CardMedia,
//     Typography, Button, Select, MenuItem, FormControl, Box, InputLabel
// } from '@mui/material';

// const IssueCard = ({ issue, onDelete, onUpdateStatus, showPoliticianDetails = false, showActions = false }) => {
//     const [selectedStatus, setSelectedStatus] = useState(issue.status);
//     const [showUpdateButton, setShowUpdateButton] = useState(false);

//     let statusColor = 'text.secondary';
//     switch (issue.status) {
//         case 'Pending':
//             statusColor = 'warning.main';
//             break;
//         case 'In-Progress':
//             statusColor = 'info.main';
//             break;
//         case 'Resolved':
//             statusColor = 'success.main';
//             break;
//     }

//     const handleStatusChange = (event) => {
//         setSelectedStatus(event.target.value);
//         setShowUpdateButton(event.target.value !== issue.status);
//     };

//     const handleUpdateClick = () => {
//         if (onUpdateStatus) {
//             onUpdateStatus(issue.issueId, selectedStatus);
//             setShowUpdateButton(false);
//         }
//     };

//     return (
//         <Card
//             sx={{
//                 width: { xs: '100%', sm: 300, md: 320 },
//                 height: 420,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 borderRadius: 3,
//                 boxShadow: 6,
//                 transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//                 '&:hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: 10,
//                 },
//             }}
//         >
//             {issue.issueImage && (
//                 <CardMedia
//                     component="img"
//                     height="140"
//                     image={`data:image/jpeg;base64,${issue.issueImage}`}
//                     alt={`Issue #${issue.issueId} image`}
//                     sx={{ objectFit: 'cover', borderBottom: '1px solid #e0e0e0' }}
//                 />
//             )}

//             <CardContent
//                 sx={{
//                     flexGrow: 1,
//                     overflowY: 'auto',
//                     overflowX: 'hidden',
//                     maxHeight: issue.issueImage ? 150 : 250,
//                     py: 1.5,
//                     px: 2
//                 }}
//             >
//                 <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.dark' }}>
//                     Issue #{issue.issueId}
//                 </Typography>
//                 <Typography variant="body2" color="text.primary" sx={{ mb: 1, textAlign: 'justify', wordBreak: 'break-word' }}>
//                     {issue.issueDescription}
//                 </Typography>
//             </CardContent>

//             {/* Moved "Submitted by" and "Assigned Politician" here, below the scrollable content */}
//             <Box sx={{ px: 2, pt: 1, pb: 2 }}>
//                 <Box sx={{ mb: 0.5 }}>
//                     <Typography variant="body2" color="text.secondary">
//                         Submitted by: <Typography component="span" sx={{ fontWeight: 'medium' }}>{issue.citizen?.ctiUsername || 'N/A'}</Typography>
//                     </Typography>
//                 </Box>
//                 {showPoliticianDetails && (
//                     <Box sx={{ mb: 0.5 }}>
//                         <Typography variant="body2" color="text.secondary">
//                             Assigned Politician: <Typography component="span" sx={{ fontWeight: 'medium' }}>{issue.politician?.pol_firstName} {issue.politician?.pol_lastName || 'N/A'}</Typography>
//                         </Typography>
//                     </Box>
//                 )}

//                 <Typography variant="body1" sx={{ mt: 1.5, mb: 1.5, fontWeight: 'bold', color: 'text.primary' }}> {/* Adjusted mt/mb */}
//                     Status: <Typography component="span" sx={{ color: statusColor, fontWeight: 'bold' }}>{issue.status}</Typography>
//                 </Typography>

//                 {showActions && (
//                     <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, alignItems: 'center', justifyContent: 'flex-start' }}>
//                         {onUpdateStatus && (
//                             <FormControl fullWidth={false} sx={{ minWidth: 120 }}>
//                                 <InputLabel id={`status-select-label-${issue.issueId}`} size="small" sx={{ top: -5 }}>Status</InputLabel>
//                                 <Select
//                                     labelId={`status-select-label-${issue.issueId}`}
//                                     id={`status-select-${issue.issueId}`}
//                                     value={selectedStatus}
//                                     onChange={handleStatusChange}
//                                     displayEmpty
//                                     size="small"
//                                     label="Status"
//                                     sx={{ borderRadius: 2 }}
//                                 >
//                                     <MenuItem value="Pending">Pending</MenuItem>
//                                     <MenuItem value="In-Progress">In-Progress</MenuItem>
//                                     <MenuItem value="Resolved">Resolved</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         )}
//                         {showUpdateButton && (
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 size="small"
//                                 onClick={handleUpdateClick}
//                                 sx={{ py: 0.8, px: 2, flexShrink: 0 }}
//                             >
//                                 Update
//                             </Button>
//                         )}
//                         {onDelete && (
//                             <Button
//                                 variant="outlined"
//                                 color="error"
//                                 size="small"
//                                 onClick={() => onDelete(issue.issueId)}
//                                 sx={{ py: 0.8, px: 2, flexShrink: 0 }}
//                             >
//                                 Delete
//                             </Button>
//                         )}
//                     </Box>
//                 )}
//             </Box>
//         </Card>
//     );
// };

// export default IssueCard;

// src/components/IssueCard.jsx
import React, { useState } from 'react';
import {
    Card, CardContent, CardActions, CardMedia,
    Typography, Button, Select, MenuItem, FormControl, Box, InputLabel
} from '@mui/material';

const IssueCard = ({ issue, onDelete, onUpdateStatus, showPoliticianDetails = false, showActions = false, onOpenDetails }) => {
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

    // Function to truncate description for subject display
    const getSubject = (description, maxLength = 60) => {
        if (!description) return '';
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    };

    const handleCardClick = () => {
        if (onOpenDetails) {
            onOpenDetails(issue); // Pass the entire issue object to the parent
        }
    };

    return (
        <Card
            sx={{
                width: { xs: '100%', sm: 300, md: 320 },
                height: 420,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 3,
                boxShadow: 6,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 10,
                    cursor: 'pointer' // Indicate clickability
                },
            }}
            onClick={handleCardClick} // Make the entire card clickable
        >
            {issue.issueImage && (
                <CardMedia
                    component="img"
                    height="140"
                    image={`data:image/jpeg;base64,${issue.issueImage}`}
                    alt={`Issue #${issue.issueId} image`}
                    sx={{ objectFit: 'cover', borderBottom: '1px solid #e0e0e0' }}
                />
            )}

            <CardContent
                sx={{
                    flexGrow: 1,
                    // No internal scrolling here if description is now a subject
                    // maxHeight: issue.issueImage ? 150 : 250, // Remove or adjust if no longer needed
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.dark' }}>
                    Issue #{issue.issueId}
                </Typography>
                {/* Display truncated description as subject */}
                <Typography variant="body2" color="text.primary" sx={{ mb: 1, textAlign: 'justify', wordBreak: 'break-word' }}>
                    {getSubject(issue.issueDescription)}
                </Typography>
            </CardContent>

            {/* Status and Actions are in a separate box below the main content */}
            <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                <Box sx={{ mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                        Submitted by: <Typography component="span" sx={{ fontWeight: 'medium' }}>{issue.citizen?.ctiUsername || 'N/A'}</Typography>
                    </Typography>
                </Box>
                {showPoliticianDetails && (
                    <Box sx={{ mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                            Assigned Politician: <Typography component="span" sx={{ fontWeight: 'medium' }}>{issue.politician?.pol_firstName} {issue.politician?.pol_lastName || 'N/A'}</Typography>
                        </Typography>
                    </Box>
                )}

                <Typography variant="body1" sx={{ mt: 1.5, mb: 1.5, fontWeight: 'bold', color: 'text.primary' }}>
                    Status: <Typography component="span" sx={{ color: statusColor, fontWeight: 'bold' }}>{issue.status}</Typography>
                </Typography>

                {showActions && (
                    <CardActions sx={{ p: 0, justifyContent: 'flex-start', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', mt: 1 }}>
                        {onUpdateStatus && (
                            <FormControl fullWidth={false} sx={{ minWidth: 120 }}>
                                <InputLabel id={`status-select-label-${issue.issueId}`} size="small" sx={{ top: -5 }}>Status</InputLabel>
                                <Select
                                    labelId={`status-select-label-${issue.issueId}`}
                                    id={`status-select-${issue.issueId}`}
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                    displayEmpty
                                    size="small"
                                    label="Status"
                                    sx={{ borderRadius: 2 }}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In-Progress">In-Progress</MenuItem>
                                    <MenuItem value="Resolved">Resolved</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        {showUpdateButton && (
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={(e) => { e.stopPropagation(); handleUpdateClick(); }} // Stop propagation to prevent card click
                                sx={{ py: 0.8, px: 2, flexShrink: 0 }}
                            >
                                Update
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={(e) => { e.stopPropagation(); onDelete(issue.issueId); }} // Stop propagation
                                sx={{ py: 0.8, px: 2, flexShrink: 0 }}
                            >
                                Delete
                            </Button>
                        )}
                    </CardActions>
                )}
            </Box>
        </Card>
    );
};

export default IssueCard;