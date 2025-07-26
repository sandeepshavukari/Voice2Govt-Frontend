// // src/components/IssueList.jsx
// import React from 'react';
// import IssueCard from './IssueCard';
// import { Box, Typography, Paper, Grid } from '@mui/material'; // Import MUI components

// const IssueList = ({ issues, title, emptyMessage, onDelete, onUpdateStatus, showPoliticianDetails = false, showActions = false }) => {
//     return (
//         <Paper elevation={6} sx={{ p: { xs: 3, md: 5 }, mb: 5, borderRadius: 3, border: '1px solid #e0e0e0' }}>
//             <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: { xs: 3, md: 5 } }}>
//                 {title}
//             </Typography>

//             {issues.length === 0 ? (
//                 <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2, border: '1px dashed #bdbdbd', textAlign: 'center' }}>
//                     <Typography variant="h6" color="text.secondary">
//                         {emptyMessage}
//                     </Typography>
//                     <Typography variant="body2" color="text.disabled" mt={1}>
//                         There are no items to display under this category.
//                     </Typography>
//                 </Box>
//             ) : (
//                 <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
//                     {issues.map((issue) => (
//                         <Grid item xs={12} sm={6} lg={4} key={issue.issueId}>
//                             <IssueCard
//                                 issue={issue}
//                                 onDelete={onDelete}
//                                 onUpdateStatus={onUpdateStatus}
//                                 showPoliticianDetails={showPoliticianDetails}
//                                 showActions={showActions}
//                             />
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </Paper>
//     );
// };

// export default IssueList;
// src/components/IssueList.jsx
import React from 'react';
import IssueCard from './IssueCard';
import { Box, Typography, Paper, Grid } from '@mui/material';

const IssueList = ({ issues, title, emptyMessage, onDelete, onUpdateStatus, showPoliticianDetails = false, showActions = false, onOpenDetails }) => {
    return (
        <Paper elevation={6} sx={{ p: { xs: 3, md: 5 }, mb: 5, borderRadius: 3, border: '1px solid #e0e0e0' }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main', mb: { xs: 3, md: 5 } }}>
                {title}
            </Typography>

            {issues.length === 0 ? (
                <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2, border: '1px dashed #bdbdbd', textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        {emptyMessage}
                    </Typography>
                    <Typography variant="body2" color="text.disabled" mt={1}>
                        There are no items to display under this category.
                    </Typography>
                </Box>
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
                                onOpenDetails={onOpenDetails} // Pass the handler here
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Paper>
    );
};

export default IssueList;