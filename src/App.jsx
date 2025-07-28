// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, Button, Typography, Box,
    IconButton, Menu, MenuItem, Avatar, Container,
    useMediaQuery, Drawer, List, ListItem, ListItemText,
    ListItemIcon, Divider
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';

import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/Auth/AdminLoginPage';
import CitizenLoginPage from './pages/Auth/CitizenLoginPage';
import PoliticianLoginPage from './pages/Auth/PoliticianLoginPage';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import CitizenDashboard from './pages/Dashboards/CitizenDashboard';
import PoliticianDashboard from './pages/Dashboards/PoliticianDashboard';
import AdminRegisterPage from './pages/Auth/AdminRegisterPage';
import CitizenRegisterPage from './pages/Auth/CitizenRegisterPage';
import PoliticianRegisterPage from './pages/Auth/PoliticianRegisterPage';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

import ManageAdminsPage from './pages/Dashboards/ManageAdminsPage';
import ManageCitizensPage from './pages/Dashboards/ManageCitizensPage';
import ManagePoliticiansPage from './pages/Dashboards/ManagePoliticiansPage';
import ManageIssuesPage from './pages/Dashboards/ManageIssuesPage';

import ProfileViewPage from './pages/Profile/ProfileViewPage';
import EditProfilePage from './pages/Profile/EditProfilePage';

// --- AuthContext Definition ---
export const AuthContext = React.createContext(null);
// --- End AuthContext Definition ---

// --- Styled Components for Enhanced Navbar ---
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
        borderRadius: '0 0 2px 2px'
    }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: '70px',
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0, 2),
        minHeight: '60px'
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 1),
        minHeight: '56px'
    }
}));

const LogoText = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #ffffff 30%, #f0f8ff 90%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 800,
    fontSize: '1.8rem',
    letterSpacing: '1px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        textShadow: '0 4px 8px rgba(0,0,0,0.2)'
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '1.6rem'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.4rem',
        letterSpacing: '0.5px'
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: '1.2rem'
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '25px',
    color: 'white',
    fontWeight: 600,
    textTransform: 'none',
    padding: '8px 20px',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    [theme.breakpoints.down('sm')]: {
        padding: '6px 16px',
        fontSize: '0.875rem'
    }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    background: 'linear-gradient(45deg, #ff6b6b 30%, #4ecdc4 90%)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)'
    },
    [theme.breakpoints.down('sm')]: {
        width: 36,
        height: 36
    }
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        marginTop: '10px',
        minWidth: '200px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '180px'
        }
    }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: '8px',
    margin: '4px 8px',
    transition: 'all 0.2s ease',
    '&:hover': {
        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
        color: 'white',
        transform: 'translateX(5px)'
    }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: 280,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            width: 260
        }
    }
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    margin: '4px 8px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.1)',
        transform: 'translateX(5px)'
    }
}));
// --- End Styled Components ---

// --- Enhanced Material-UI Theme Definition ---
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
        h1: { 
            fontWeight: 700,
            fontSize: '2.5rem',
            fontFamily: 'Inter, sans-serif',
            '@media (max-width:600px)': {
                fontSize: '2rem',
            },
        },
        h2: { 
            fontWeight: 700,
            fontSize: '2rem',
            fontFamily: 'Inter, sans-serif',
            '@media (max-width:600px)': {
                fontSize: '1.75rem',
            },
        },
        h3: { 
            fontWeight: 700,
            fontSize: '1.75rem',
            fontFamily: 'Inter, sans-serif',
            '@media (max-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h4: { 
            fontWeight: 600,
            fontSize: '1.5rem',
            fontFamily: 'Inter, sans-serif',
            '@media (max-width:600px)': {
                fontSize: '1.25rem',
            },
        },
        h5: { 
            fontWeight: 500,
            fontSize: '1.25rem',
            fontFamily: 'Inter, sans-serif',
            '@media (max-width:600px)': {
                fontSize: '1.125rem',
            },
        },
        h6: { 
            fontWeight: 500,
            fontSize: '1.125rem',
            fontFamily: 'Inter, sans-serif',
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
        },
        body1: { 
            fontSize: '1rem',
            fontFamily: 'Inter, sans-serif',
            '@media (max-width:600px)': {
                fontSize: '0.875rem',
            },
        },
        body2: { 
            fontSize: '0.875rem',
            fontFamily: 'Inter, sans-serif',
            '@media (max-width:600px)': {
                fontSize: '0.8125rem',
            },
        },
        button: {
            fontFamily: 'Inter, sans-serif',
            textTransform: 'none',
        },
        caption: {
            fontFamily: 'Inter, sans-serif',
        },
        overline: {
            fontFamily: 'Inter, sans-serif',
        },
    },
    palette: {
        primary: { main: '#667eea' },
        secondary: { main: '#764ba2' },
        success: { main: '#4CAF50' },
        warning: { main: '#FFC107' },
        info: { main: '#2196F3' },
        background: { default: '#f8fafc', paper: '#ffffff' }
    },
    components: {
        MuiButton: { 
            styleOverrides: { 
                root: { 
                    borderRadius: 8, 
                    textTransform: 'none',
                    fontFamily: 'Inter, sans-serif',
                    '@media (max-width:600px)': {
                        fontSize: '0.875rem',
                        padding: '6px 16px',
                    },
                } 
            } 
        },
        MuiTextField: { 
            styleOverrides: { 
                root: { 
                    marginBottom: '16px',
                    fontFamily: 'Inter, sans-serif',
                    '@media (max-width:600px)': {
                        marginBottom: '12px',
                    },
                } 
            } 
        },
        MuiPaper: { 
            styleOverrides: { 
                root: { 
                    borderRadius: 12,
                    fontFamily: 'Inter, sans-serif',
                    '@media (max-width:600px)': {
                        borderRadius: 8,
                    },
                } 
            } 
        },
        MuiCard: { 
            styleOverrides: { 
                root: { 
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    fontFamily: 'Inter, sans-serif',
                    '@media (max-width:600px)': {
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
                    },
                } 
            } 
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter, sans-serif',
                    '@media (max-width:600px)': {
                        paddingLeft: '16px',
                        paddingRight: '16px',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter, sans-serif',
                },
            },
        },
    },
});
// --- End Enhanced Material-UI Theme Definition ---


function App() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const openProfileMenu = Boolean(profileAnchorEl);

    const [loginAnchorEl, setLoginAnchorEl] = useState(null);
    const openLoginMenu = Boolean(loginAnchorEl);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // --- useEffect to load user from localStorage on app start ---
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem('user'); // Clear corrupted data
            }
        }
    }, []);
    // --- End useEffect ---

    // --- handleLoginSuccess: Saves user data to state and localStorage ---
    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser);
        setIsAuthenticated(true);
        // Store the entire loggedInUser object including firstName/lastName
        localStorage.setItem('user', JSON.stringify(loggedInUser));
    };
    // --- End handleLoginSuccess ---

    // --- handleLogout: Clears user data and redirects ---
    const handleLogout = () => {
        setProfileAnchorEl(null); // Close any open menu
        setMobileMenuOpen(false); // Close mobile menu
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear(); // Clears all related user data from localStorage
        navigate('/'); // Redirect to home/login page
    };
    // --- End handleLogout ---

    // --- Navbar Menu Handlers ---
    const handleProfileMenuOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleProfileClick = () => {
        handleProfileMenuClose(); // Close menu on click
        setMobileMenuOpen(false); // Close mobile menu
        if (user) {
            // Use the username from the user object in context for profile path
            const profileUsername = user.username;
            navigate(`/profile/${user.type}/${profileUsername}`);
        }
    };

    const handleDashboardClick = () => {
        handleProfileMenuClose(); // Close menu on click
        setMobileMenuOpen(false); // Close mobile menu
        if (user) {
            navigate(`/${user.type}/dashboard`);
        }
    };

    const handleLoginMenuOpen = (event) => {
        setLoginAnchorEl(event.currentTarget);
    };
    const handleLoginMenuClose = () => {
        setLoginAnchorEl(null);
    };
    const handleLoginClick = (path) => {
        handleLoginMenuClose(); // Close menu on click
        setMobileMenuOpen(false); // Close mobile menu
        navigate(path);
    };

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    // --- End Navbar Menu Handlers ---

    // Mobile menu items
    const mobileMenuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, onClick: handleDashboardClick, show: isAuthenticated },
        { text: 'Profile', icon: <PersonIcon />, onClick: handleProfileClick, show: isAuthenticated },
        { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout, show: isAuthenticated },
    ];

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, handleLogout, handleLoginSuccess }}>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* Applies baseline CSS for Material-UI */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    minHeight: '100vh',
                    backgroundColor: 'background.default' 
                }}>
                    {/* --- Enhanced AppBar (Navigation Bar) --- */}
                    <StyledAppBar position="static" elevation={0}>
                        <Container maxWidth="xl">
                            <StyledToolbar sx={{ justifyContent: 'space-between' }}>
                                {/* Logo/App Name */}
                                <Box component={Link} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                    <LogoText variant="h6" component="span">
                                        Voice2Govt
                                    </LogoText>
                                </Box>

                                {/* Right-side navigation/auth buttons */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                                    {!isAuthenticated ? (
                                        // Not logged in: Show Login button with dropdown
                                        <>
                                            {!isMobile ? (
                                                <>
                                                    <StyledButton
                                                        onClick={handleLoginMenuOpen}
                                                        aria-controls="login-menu-appbar"
                                                        aria-haspopup="true"
                                                    >
                                                        Login
                                                    </StyledButton>
                                                    <StyledMenu
                                                        id="login-menu-appbar"
                                                        anchorEl={loginAnchorEl}
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        keepMounted
                                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                        open={openLoginMenu}
                                                        onClose={handleLoginMenuClose}
                                                    >
                                                        <StyledMenuItem onClick={() => handleLoginClick('/admin/login')}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff6b6b' }} />
                                                                Admin Login
                                                            </Box>
                                                        </StyledMenuItem>
                                                        <StyledMenuItem onClick={() => handleLoginClick('/citizen/login')}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ecdc4' }} />
                                                                Citizen Login
                                                            </Box>
                                                        </StyledMenuItem>
                                                        <StyledMenuItem onClick={() => handleLoginClick('/politician/login')}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#45b7d1' }} />
                                                                Politician Login
                                                            </Box>
                                                        </StyledMenuItem>
                                                    </StyledMenu>
                                                </>
                                            ) : (
                                                <IconButton
                                                    color="inherit"
                                                    onClick={handleMobileMenuToggle}
                                                    sx={{ display: { md: 'none' } }}
                                                >
                                                    <MenuIcon />
                                                </IconButton>
                                            )}
                                        </>
                                    ) : (
                                        // Logged in: Show Avatar with dropdown menu
                                        <>
                                            {!isMobile ? (
                                                <>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                                                            Welcome, {user?.firstName || 'User'}
                                                        </Typography>
                                                    </Box>
                                                    <IconButton
                                                        size="large"
                                                        edge="end"
                                                        aria-label="account of current user"
                                                        aria-controls="profile-menu-appbar"
                                                        aria-haspopup="true"
                                                        onClick={handleProfileMenuOpen}
                                                        color="inherit"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        {/* Display initial of user's first name in Avatar */}
                                                        {user && user.firstName ? (
                                                            <StyledAvatar>
                                                                {user.firstName.charAt(0).toUpperCase()}
                                                            </StyledAvatar>
                                                        ) : (
                                                            <AccountCircle sx={{ fontSize: 40, color: 'white' }} />
                                                        )}
                                                    </IconButton>
                                                    <StyledMenu
                                                        id="profile-menu-appbar"
                                                        anchorEl={profileAnchorEl}
                                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                        keepMounted
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right',
                                                        }}
                                                        open={openProfileMenu}
                                                        onClose={handleProfileMenuClose}
                                                    >
                                                        <StyledMenuItem onClick={handleDashboardClick}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#667eea' }} />
                                                                My Dashboard
                                                            </Box>
                                                        </StyledMenuItem>
                                                        <StyledMenuItem onClick={handleProfileClick}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#764ba2' }} />
                                                                View Profile
                                                            </Box>
                                                        </StyledMenuItem>
                                                        <StyledMenuItem onClick={handleLogout}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff6b6b' }} />
                                                                Logout
                                                            </Box>
                                                        </StyledMenuItem>
                                                    </StyledMenu>
                                                </>
                                            ) : (
                                                <IconButton
                                                    color="inherit"
                                                    onClick={handleMobileMenuToggle}
                                                    sx={{ display: { md: 'none' } }}
                                                >
                                                    <MenuIcon />
                                                </IconButton>
                                            )}
                                        </>
                                    )}
                                </Box>
                            </StyledToolbar>
                        </Container>
                    </StyledAppBar>
                    {/* --- End Enhanced AppBar --- */}

                    {/* Mobile Drawer */}
                    <StyledDrawer
                        anchor="right"
                        open={mobileMenuOpen}
                        onClose={() => setMobileMenuOpen(false)}
                        sx={{ display: { md: 'none' } }}
                    >
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
                                {isAuthenticated ? `Welcome, ${user?.firstName || 'User'}` : 'Menu'}
                            </Typography>
                            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} />
                            
                            {!isAuthenticated ? (
                                <List>
                                    <StyledListItem button onClick={() => handleLoginClick('/admin/login')}>
                                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff6b6b' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Admin Login" />
                                    </StyledListItem>
                                    <StyledListItem button onClick={() => handleLoginClick('/citizen/login')}>
                                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ecdc4' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Citizen Login" />
                                    </StyledListItem>
                                    <StyledListItem button onClick={() => handleLoginClick('/politician/login')}>
                                        <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#45b7d1' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Politician Login" />
                                    </StyledListItem>
                                </List>
                            ) : (
                                <List>
                                    {mobileMenuItems.filter(item => item.show).map((item, index) => (
                                        <StyledListItem key={index} button onClick={item.onClick}>
                                            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </StyledListItem>
                                    ))}
                                </List>
                            )}
                        </Box>
                    </StyledDrawer>

                    {/* --- Main Content Area: Routes --- */}
                    <Box sx={{ 
                        flex: 1,
                        pt: { xs: 2, sm: 3, md: 4 }, 
                        pb: { xs: 2, sm: 3, md: 4 }, 
                        px: { xs: 1, sm: 2, md: 3, lg: 4 } 
                    }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/admin/login" element={<AdminLoginPage />} />
                            <Route path="/citizen/login" element={<CitizenLoginPage />} />
                            <Route path="/politician/login" element={<PoliticianLoginPage />} />
                            <Route path="/admin/register" element={<AdminRegisterPage />} />
                            <Route path="/citizen/register" element={<CitizenRegisterPage />} />
                            <Route path="/politician/register" element={<PoliticianRegisterPage />} />

                            {/* Main Dashboards (Protected Routes) */}
                            <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
                            <Route path="/citizen/dashboard" element={<PrivateRoute allowedRoles={['citizen']}><CitizenDashboard /></PrivateRoute>} />
                            <Route path="/politician/dashboard" element={<PrivateRoute allowedRoles={['politician']}><PoliticianDashboard /></PrivateRoute>} />

                            {/* Admin Management Routes (Protected Routes) */}
                            <Route path="/admin/manage-admins" element={<PrivateRoute allowedRoles={['admin']}><ManageAdminsPage /></PrivateRoute>} />
                            <Route path="/admin/manage-citizens" element={<PrivateRoute allowedRoles={['admin']}><ManageCitizensPage /></PrivateRoute>} />
                            <Route path="/admin/manage-politicians" element={<PrivateRoute allowedRoles={['admin']}><ManagePoliticiansPage /></PrivateRoute>} />
                            <Route path="/admin/manage-issues" element={<PrivateRoute allowedRoles={['admin']}><ManageIssuesPage /></PrivateRoute>} />

                            {/* Profile View and Edit Routes (Protected, can be accessed by self or admin) */}
                            <Route path="/profile/:userType/:idOrUsername" element={<ProfileViewPage />} />
                            <Route path="/profile/:userType/:idOrUsername/edit" element={<PrivateRoute allowedRoles={['admin', 'citizen', 'politician']}><EditProfilePage /></PrivateRoute>} />

                            {/* Fallback 404 Route */}
                            <Route path="*" element={<Typography variant="h4" color="error" align="center" sx={{ mt: 5 }}>404 Not Found</Typography>} />
                        </Routes>
                    </Box>
                    {/* --- End Main Content Area --- */}

                    {/* Footer */}
                    <Footer />
                </Box>
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

export default App;