import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ children, requiredStatus }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredStatus) {
        const userProgress = user.exercises || [];
        const hasAccess = userProgress.some(ex => ex.status === requiredStatus);
        return hasAccess ? children : <Navigate to="/exercises" />;
    }

    return children;
};

export default ProtectedRoute;
