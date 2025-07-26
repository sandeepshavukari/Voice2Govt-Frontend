// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, Button, Typography, Box,
    IconButton, Menu, MenuItem, Avatar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircle from '@mui/icons-material/AccountCircle';

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

import ManageAdminsPage from './pages/Dashboards/ManageAdminsPage';
import ManageCitizensPage from './pages/Dashboards/ManageCitizensPage';
import ManagePoliticiansPage from './pages/Dashboards/ManagePoliticiansPage';
import ManageIssuesPage from './pages/Dashboards/ManageIssuesPage';

import ProfileViewPage from './pages/Profile/ProfileViewPage';
import EditProfilePage from './pages/Profile/EditProfilePage';

export const AuthContext = React.createContext(null);

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
        success: { main: '#4CAF50' },
        warning: { main: '#FFC107' },
        info: { main: '#2196F3' },
        background: { default: '#f4f6f8', paper: '#ffffff' }
    },
    typography: {
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 500 },
        h6: { fontWeight: 500 },
        body1: { fontSize: '1rem' },
        body2: { fontSize: '0.875rem' },
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } } },
        MuiTextField: { styleOverrides: { root: { marginBottom: '16px' } } },
        MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
        MuiCard: { styleOverrides: { root: { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' } } },
    },
});


function App() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const openProfileMenu = Boolean(profileAnchorEl);

    const [loginAnchorEl, setLoginAnchorEl] = useState(null);
    const openLoginMenu = Boolean(loginAnchorEl);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem('user');
                localStorage.removeItem('userType');
                localStorage.removeItem('username');
                localStorage.removeItem('politicianId');
            }
        }
    }, []);

    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('userType', loggedInUser.type);
        localStorage.setItem('username', loggedInUser.username);
        if (loggedInUser.type === 'politician' && loggedInUser.id) {
            localStorage.setItem('politicianId', loggedInUser.id);
        }
    };


    const handleLogout = () => {
        setProfileAnchorEl(null); // Close the menu when logging out
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear();
        navigate('/');
    };

    const handleProfileMenuOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleProfileClick = () => {
        handleProfileMenuClose(); // Close menu on click
        if (user) {
            const profileUsername = user.username;
            navigate(`/profile/${user.type}/${profileUsername}`);
        }
    };

    const handleDashboardClick = () => {
        handleProfileMenuClose(); // Close menu on click
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
        navigate(path);
    };


    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, handleLogout, handleLoginSuccess }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
                    <AppBar position="static" color="primary">
                        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', py: { xs: 1, sm: 0 } }}>
                            <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                                Voice2Govt
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
                                {!isAuthenticated ? (
                                    <>
                                        <Button
                                            color="inherit"
                                            onClick={handleLoginMenuOpen}
                                            aria-controls="login-menu-appbar"
                                            aria-haspopup="true"
                                        >
                                            Login
                                        </Button>
                                        <Menu
                                            id="login-menu-appbar"
                                            anchorEl={loginAnchorEl}
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            keepMounted
                                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            open={openLoginMenu}
                                            onClose={handleLoginMenuClose}
                                            sx={{ mt: 5 }}
                                        >
                                            <MenuItem onClick={() => handleLoginClick('/admin/login')}>Admin Login</MenuItem>
                                            <MenuItem onClick={() => handleLoginClick('/citizen/login')}>Citizen Login</MenuItem>
                                            <MenuItem onClick={() => handleLoginClick('/politician/login')}>Politician Login</MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <>
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls="profile-menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            {user && user.firstName ? (
                                                <Avatar sx={{ bgcolor: 'secondary.main', width: 35, height: 35 }}>
                                                    {user.firstName.charAt(0).toUpperCase()}
                                                </Avatar>
                                            ) : (
                                                <AccountCircle sx={{ fontSize: 35 }} />
                                            )}
                                        </IconButton>
                                        <Menu
                                            id="profile-menu-appbar"
                                            anchorEl={profileAnchorEl}
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openProfileMenu}
                                            onClose={handleProfileMenuClose}
                                            sx={{ mt: 5 }}
                                        >
                                            {/* Corrected onClick handlers for MenuItems */}
                                            <MenuItem onClick={handleDashboardClick}>My Dashboard</MenuItem>
                                            <MenuItem onClick={handleProfileClick}>View Profile</MenuItem>
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Box sx={{ pt: 4, pb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/admin/login" element={<AdminLoginPage />} />
                            <Route path="/citizen/login" element={<CitizenLoginPage />} />
                            <Route path="/politician/login" element={<PoliticianLoginPage />} />
                            <Route path="/admin/register" element={<AdminRegisterPage />} />
                            <Route path="/citizen/register" element={<CitizenRegisterPage />} />
                            <Route path="/politician/register" element={<PoliticianRegisterPage />} />

                            {/* Main Dashboards */}
                            <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
                            <Route path="/citizen/dashboard" element={<PrivateRoute allowedRoles={['citizen']}><CitizenDashboard /></PrivateRoute>} />
                            <Route path="/politician/dashboard" element={<PrivateRoute allowedRoles={['politician']}><PoliticianDashboard /></PrivateRoute>} />

                            {/* Admin Management Routes */}
                            <Route path="/admin/manage-admins" element={<PrivateRoute allowedRoles={['admin']}><ManageAdminsPage /></PrivateRoute>} />
                            <Route path="/admin/manage-citizens" element={<PrivateRoute allowedRoles={['admin']}><ManageCitizensPage /></PrivateRoute>} />
                            <Route path="/admin/manage-politicians" element={<PrivateRoute allowedRoles={['admin']}><ManagePoliticiansPage /></PrivateRoute>} />
                            <Route path="/admin/manage-issues" element={<PrivateRoute allowedRoles={['admin']}><ManageIssuesPage /></PrivateRoute>} />

                            {/* Profile View and Edit Routes */}
                            <Route path="/profile/:userType/:idOrUsername" element={<ProfileViewPage />} />
                            <Route path="/profile/:userType/:idOrUsername/edit" element={<PrivateRoute allowedRoles={['admin', 'citizen', 'politician']}><EditProfilePage /></PrivateRoute>} />

                            <Route path="*" element={<Typography variant="h4" color="error" align="center" sx={{ mt: 5 }}>404 Not Found</Typography>} />
                        </Routes>
                    </Box>
                </Box>
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

export default App;