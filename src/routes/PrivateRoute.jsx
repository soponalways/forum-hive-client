import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/Join-us"></Navigate>
    }

    return children;
};

export default PrivateRoute;