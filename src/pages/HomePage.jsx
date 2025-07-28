// src/pages/HomePage.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, CardMedia, Button, useMediaQuery } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
        transform: 'translateY(-10px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        '& .card-icon': {
            transform: 'scale(1.1)'
        }
    },
    [theme.breakpoints.down('sm')]: {
        borderRadius: '16px',
        '&:hover': {
            transform: 'translateY(-5px)',
        }
    }
}));

const StyledButton = styled(Button)(({ theme, color }) => ({
    borderRadius: '12px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    ...(color === 'primary' && {
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        '&:hover': {
            background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)'
        }
    }),
    ...(color === 'success' && {
        background: 'linear-gradient(45deg, #4caf50 30%, #45a049 90%)',
        boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
        '&:hover': {
            background: 'linear-gradient(45deg, #45a049 30%, #388e3c 90%)'
        }
    }),
    ...(color === 'secondary' && {
        background: 'linear-gradient(45deg, #9c27b0 30%, #7b1fa2 90%)',
        boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)',
        '&:hover': {
            background: 'linear-gradient(45deg, #7b1fa2 30%, #6a1b9a 90%)'
        }
    }),
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
        padding: '8px 16px',
        '&:hover': {
            transform: 'translateY(-1px)',
        }
    }
}));

// Hero Images Data
const heroImages = [
    {
        id: 1,
        image: "https://www.deccanchronicle.com/h-upload/2024/07/29/1827444-apcabinetmeeting.webp",
        // title: "Empowering Voices for Governance",
        // subtitle: "Bridging the gap between citizens and government"
    },
    {
        id: 2,
        image: "https://apdascac.ap.gov.in/assets/images/full_images/1.jpeg",
        // title: "Digital Government Services",
        // subtitle: "Access government services and information at your fingertips"
    },
    {
        id: 3,
        image: "https://th-i.thgim.com/public/incoming/v9rl86/article68356255.ece/alternates/FREE_1200/PTI07_01_2024_000125A.jpg",
        // title: "Digital Governance",
        // subtitle: "Modern solutions for modern challenges"
    },
    {
        id: 4,
        image: "https://images.cnbctv18.com/uploads/2024/04/pti04-24-2024-000322a-2024-04-1fc67f5cc5c40dbc6cdcb9ee9ae59053-scaled.jpg?impolicy=website&width=1200&height=900",
        // title: "Community Engagement",
        // subtitle: "Building stronger communities through active participation"
    }
];

function HomePage() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:960px)');

    // Carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'linear',
        arrows: !isMobile,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            overflowX: 'hidden',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            minHeight: '100vh'
        }}>

            {/* Hero Section with Carousel */}
            <Box
                sx={{
                    width: '100%',
                    height: { xs: 200, sm: 300, md: 400, lg: 450 },
                    position: 'relative',
                    mb: { xs: 4, sm: 6, md: 8, lg: 10 },
                    borderRadius: { xs: 1, sm: 2, md: 3, lg: 4 },
                    overflow: 'hidden',
                    boxShadow: '0px 15px 35px rgba(0,0,0,0.3)',
                    mx: { xs: 1, sm: 2, md: 3 }
                }}
            >
                <Slider {...settings}>
                    {heroImages.map((slide) => (
                        <Box
                            key={slide.id}
                            sx={{
                                height: { xs: 200, sm: 300, md: 400, lg: 450 },
                                backgroundImage: `url("${slide.image}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                textAlign: 'center',
                                position: 'relative'
                            }}
                        >
                            {/* Overlay for better text readability */}
                            <Box sx={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: slide.title ? 
                                    'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)' :
                                    'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%)',
                            }} />
                            
                            {slide.title && (
                                <Box sx={{ zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
                                    <Typography
                                        variant="h2"
                                        component="h1"
                                        sx={{
                                            fontWeight: 800,
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                                            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                                            lineHeight: 1.2,
                                            color: '#ffffff',
                                            textAlign: 'center',
                                            letterSpacing: '-0.02em',
                                            mb: { xs: 1, sm: 2 }
                                        }}
                                    >
                                        {slide.title}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 500,
                                            textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                                            fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem' },
                                            color: '#ffffff',
                                            opacity: 0.9,
                                            maxWidth: { xs: '280px', sm: '400px', md: '600px' },
                                            mx: 'auto'
                                        }}
                                    >
                                        {slide.subtitle}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Slider>
            </Box>

            {/* Main Content: Welcome Message & Contributor Cards */}
            <Box sx={{ 
                maxWidth: '1200px', 
                width: '100%', 
                px: { xs: 1, sm: 2, md: 3, lg: 4 } 
            }}>
                <Typography 
                    variant="h3" 
                    component="h2" 
                    gutterBottom 
                    align="center" 
                    sx={{ 
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: { xs: 2, sm: 3 },
                        letterSpacing: '1px',
                        fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }
                    }}
                >
                    Welcome to Voice2Govt
                </Typography>
                <Typography 
                    variant="h5" 
                    align="center" 
                    color="text.secondary" 
                    sx={{ 
                        maxWidth: { xs: '100%', sm: '800px', md: '900px' }, 
                        mx: 'auto', 
                        mb: { xs: 4, sm: 6, md: 8, lg: 10 }, 
                        px: { xs: 1, sm: 2 }, 
                        lineHeight: 1.6,
                        fontWeight: 500,
                        opacity: 0.8,
                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                    }}
                >
                    Your dedicated platform to bridge the gap between citizens, politicians, and administrators. We believe in transparency and direct communication to foster a more responsive and accountable government.
                </Typography>

                <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }} justifyContent="center" sx={{ mb: { xs: 6, sm: 8, md: 10, lg: 12 } }}>
                    {/* Card: Citizens */}
                    <Grid item xs={12} sm={6} md={4}>
                        <StyledCard>
                            <CardContent sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                textAlign: 'center', 
                                flexGrow: 1,
                                p: { xs: 2, sm: 3, md: 4 }
                            }}>
                                <Box sx={{
                                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                    borderRadius: '50%',
                                    p: { xs: 1.5, sm: 2 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: { xs: 2, sm: 3 },
                                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                                    transition: 'all 0.3s ease'
                                }} className="card-icon">
                                    <GroupIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white' }} />
                                </Box>
                                <Typography variant="h5" component="h3" gutterBottom sx={{ 
                                    fontWeight: 700, 
                                    mb: { xs: 1, sm: 2 },
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }}>
                                    Citizens
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ 
                                    lineHeight: 1.6, 
                                    mb: { xs: 2, sm: 3 },
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}>
                                    Submit and track your local issues directly to your representatives, ensuring your voice is heard.
                                </Typography>
                                <StyledButton 
                                    component={Link} 
                                    to="/citizen/login" 
                                    variant="contained" 
                                    color="primary" 
                                    sx={{ px: { xs: 3, sm: 4 }, py: { xs: 1, sm: 1.5 } }}
                                >
                                    Get Started
                                </StyledButton>
                            </CardContent>
                        </StyledCard>
                    </Grid>

                    {/* Card: Politicians */}
                    <Grid item xs={12} sm={6} md={4}>
                        <StyledCard>
                            <CardContent sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                textAlign: 'center', 
                                flexGrow: 1,
                                p: { xs: 2, sm: 3, md: 4 }
                            }}>
                                <Box sx={{
                                    background: 'linear-gradient(45deg, #4caf50 30%, #45a049 90%)',
                                    borderRadius: '50%',
                                    p: { xs: 1.5, sm: 2 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: { xs: 2, sm: 3 },
                                    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
                                    transition: 'all 0.3s ease'
                                }} className="card-icon">
                                    <HowToVoteIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white' }} />
                                </Box>
                                <Typography variant="h5" component="h3" gutterBottom sx={{ 
                                    fontWeight: 700, 
                                    mb: { xs: 1, sm: 2 },
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }}>
                                    Politicians
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ 
                                    lineHeight: 1.6, 
                                    mb: { xs: 2, sm: 3 },
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}>
                                    Manage, prioritize, and resolve issues reported by your constituents effectively.
                                </Typography>
                                <StyledButton 
                                    component={Link} 
                                    to="/politician/login" 
                                    variant="contained" 
                                    color="success" 
                                    sx={{ px: { xs: 3, sm: 4 }, py: { xs: 1, sm: 1.5 } }}
                                >
                                    Access Panel
                                </StyledButton>
                            </CardContent>
                        </StyledCard>
                    </Grid>

                    {/* Card: Administrators */}
                    <Grid item xs={12} sm={6} md={4}>
                        <StyledCard>
                            <CardContent sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                textAlign: 'center', 
                                flexGrow: 1,
                                p: { xs: 2, sm: 3, md: 4 }
                            }}>
                                <Box sx={{
                                    background: 'linear-gradient(45deg, #9c27b0 30%, #7b1fa2 90%)',
                                    borderRadius: '50%',
                                    p: { xs: 1.5, sm: 2 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: { xs: 2, sm: 3 },
                                    boxShadow: '0 8px 25px rgba(156, 39, 176, 0.3)',
                                    transition: 'all 0.3s ease'
                                }} className="card-icon">
                                    <AccountBalanceIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white' }} />
                                </Box>
                                <Typography variant="h5" component="h3" gutterBottom sx={{ 
                                    fontWeight: 700, 
                                    mb: { xs: 1, sm: 2 },
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }}>
                                    Administrators
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ 
                                    lineHeight: 1.6, 
                                    mb: { xs: 2, sm: 3 },
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}>
                                    Oversee the entire system, manage user accounts, and ensure smooth operations.
                                </Typography>
                                <StyledButton 
                                    component={Link} 
                                    to="/admin/login" 
                                    variant="contained" 
                                    color="secondary" 
                                    sx={{ px: { xs: 3, sm: 4 }, py: { xs: 1, sm: 1.5 } }}
                                >
                                    Admin Login
                                </StyledButton>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                </Grid>

                <Typography 
                    variant="h6" 
                    align="center" 
                    color="text.secondary" 
                    sx={{ 
                        mt: { xs: 4, sm: 5, md: 6, lg: 8 }, 
                        mb: { xs: 3, sm: 4 }, 
                        px: { xs: 1, sm: 2 },
                        fontWeight: 500,
                        opacity: 0.8,
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                >
                    Ready to make a difference? Log in or register to begin your journey towards a more responsive government.
                </Typography>
            </Box>
        </Box>
    );
}

export default HomePage;