import React from 'react';
import useGetRole from '../../api/useGetRole';
import Loading from '../../components/Loading';
import AdminRoute from '../../routes/AdminRoute';
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './User/UserDashboard';

const Dashboard = () => {
    const { role, isLoading } = useGetRole();


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {role === "admin" ? <>
                <AdminRoute>
                    <AdminDashboard></AdminDashboard>
                </AdminRoute>
            </>
                :
                <>
                    <UserDashboard></UserDashboard>
                </>}
        </div>
    );
};

export default Dashboard;