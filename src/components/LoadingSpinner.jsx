// src/components/LoadingSpinner.jsx
import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';

/**
 * A reusable loading spinner component with enhanced styling.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isLoading - Whether the loading spinner should be displayed.
 * @param {string} [props.message="Loading..."] - The message to display while loading.
 * @param {string} [props.height="200px"] - The height of the container when loading.
 * @param {React.ReactNode} props.children - The content to display when not loading.
 */
const LoadingSpinner = ({ isLoading, message = "Loading data...", height = "200px", children }) => {
    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: height,
                width: '100%',
                py: 4,
                position: 'relative'
            }}>
                <Paper 
                    elevation={3} 
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(10px)',
                        minWidth: 280,
                        textAlign: 'center',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                            zIndex: -1
                        }
                    }}
                >
                    <CircularProgress 
                        size={60}
                        thickness={4}
                        sx={{ 
                            mb: 3,
                            color: 'primary.main',
                            '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                                animation: 'pulse 2s ease-in-out infinite'
                            }
                        }} 
                    />
                    <Typography 
                        variant="h6" 
                        color="text.primary"
                        sx={{ 
                            fontWeight: 500,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {message}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            mt: 1,
                            opacity: 0.8,
                            fontStyle: 'italic'
                        }}
                    >
                        Please wait...
                    </Typography>
                </Paper>
            </Box>
        );
    }

    return <>{children}</>; // Render children when not loading
};

export default LoadingSpinner;