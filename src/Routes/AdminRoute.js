import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingPage from '../Components/LoadingPage';
import useAdmin from '../Hooks/useAdmin';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();
    
    if (isLoading || isAdminLoading) {
        return <LoadingPage />
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;