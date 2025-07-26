// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && (!user || !allowedRoles.includes(user.type))) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;