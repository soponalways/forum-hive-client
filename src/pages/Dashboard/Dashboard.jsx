import React from 'react';
import useGetRole from '../../api/useGetRole';
import Loading from '../../components/Loading';
import AdminRoute from '../../routes/AdminRoute';
import { Navigate } from 'react-router';

const Dashboard = () => {
    const { role, isLoading } = useGetRole();

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {role === "admin" ? <>
                <AdminRoute>
                    <Navigate to={'/dashboard/admin-profile'}></Navigate>
                </AdminRoute>
            </>
                :
                <>
                    <Navigate to={'/dashboard/profile'}></Navigate>
                </>}
        </div>
    );
};

export default Dashboard;