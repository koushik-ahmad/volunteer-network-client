import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const location = useLocation();

    if (loading) {
        return <h1 className='text-5xl text-center'>Loading...</h1>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default PrivateRoute;