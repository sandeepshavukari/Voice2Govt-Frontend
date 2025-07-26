// // src/pages/HomePage.jsx
// import React from 'react';
// import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home'; // Example icon
// import GroupIcon from '@mui/icons-material/Group';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import HowToVoteIcon from '@mui/icons-material/HowToVote';

// function HomePage() {
//     return (
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, px: 2 }}>
//             <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
//                 Welcome to Voice2Govt
//             </Typography>
//             <Typography variant="h6" align="center" color="text.secondary" sx={{ maxWidth: '800px', mb: 6 }}>
//                 Your dedicated platform to bridge the gap between citizens, politicians, and administrators. Empowering voices for better governance.
//             </Typography>

//             <Grid container spacing={4} justifyContent="center">
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.03)' } }}>
//                         <CardContent>
//                             <GroupIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
//                             <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
//                                 Citizens
//                             </Typography>
//                             <Typography variant="body1" color="text.secondary">
//                                 Submit and track your local issues directly to your representatives.
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.03)' } }}>
//                         <CardContent>
//                             <HowToVoteIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
//                             <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
//                                 Politicians
//                             </Typography>
//                             <Typography variant="body1" color="text.secondary">
//                                 Manage, prioritize, and resolve issues reported by your constituents.
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.03)' } }}>
//                         <CardContent>
//                             <AccountBalanceIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
//                             <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
//                                 Administrators
//                             </Typography>
//                             <Typography variant="body1" color="text.secondary">
//                                 Oversee the system, manage user accounts, and ensure smooth operations.
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//             <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 8 }}>
//                 Please log in or register to get started on your journey towards a more responsive government.
//             </Typography>
//         </Box>
//     );
// }

// export default HomePage;
// src/pages/HomePage.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, CardMedia } from '@mui/material'; // Added CardMedia
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

function HomePage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

            {/* Hero Image Section */}
            <Box
                sx={{
                    width: '100%',
                    height: { xs: 200, sm: 300, md: 400 }, // Responsive height for hero image
                    backgroundImage: 'url("https://www.deccanchronicle.com/h-upload/2024/07/29/1827444-apcabinetmeeting.webp")', // Replace with your actual image URL
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    mb: 8, // Margin bottom to push content down
                    borderRadius: 2, // Consistent border radius
                    boxShadow: 8, // Prominent shadow
                }}
            >
                {/* Overlay for better text readability */}
                <Box sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
                    borderRadius: 2,
                }} />
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        zIndex: 1, // Ensure text is above overlay
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, // Responsive font size
                        px: 2,
                    }}
                >
                    Empowering Voices for Governance
                </Typography>
            </Box>

            {/* Main Content: Welcome Message & Contributor Cards */}
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                Welcome to Voice2Govt
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ maxWidth: '800px', mb: 6, px: 2 }}>
                Your dedicated platform to bridge the gap between citizens, politicians, and administrators.
            </Typography>

            <Grid container spacing={{ xs: 3, md: 6 }} justifyContent="center" sx={{ maxWidth: 1000, mx: 'auto', mb: 8 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', '&:hover': { transform: 'translateY(-8px)', boxShadow: 12 }, borderRadius: 3, boxShadow: 6 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexGrow: 1 }}>
                            <GroupIcon sx={{ fontSize: 70, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Citizens
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Submit and track your local issues directly to your representatives.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', '&:hover': { transform: 'translateY(-8px)', boxShadow: 12 }, borderRadius: 3, boxShadow: 6 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexGrow: 1 }}>
                            <HowToVoteIcon sx={{ fontSize: 70, color: 'success.main', mb: 2 }} />
                            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Politicians
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Manage, prioritize, and resolve issues reported by your constituents.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', '&:hover': { transform: 'translateY(-8px)', boxShadow: 12 }, borderRadius: 3, boxShadow: 6 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexGrow: 1 }}>
                            <AccountBalanceIcon sx={{ fontSize: 70, color: 'secondary.main', mb: 2 }} />
                            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Administrators
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Oversee the system, manage user accounts, and ensure smooth operations.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 5, mb: 4, px: 2 }}>
                Ready to make a difference? Log in or register to begin.
            </Typography>
        </Box>
    );
}

export default HomePage;