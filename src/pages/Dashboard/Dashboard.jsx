import React from 'react';
import useGetRole from '../../api/useGetRole';
import Loading from '../../components/Loading';
import AdminRoute from '../../routes/AdminRoute';
import AdminOverview from './Admin/AdminOverview/AdminOverview';
import UserOverview from './User/UserOverview';

const Dashboard = () => {
    const { role, isLoading } = useGetRole();

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {role === "admin" ? <>
                <AdminRoute>
                    <AdminOverview></AdminOverview>
                </AdminRoute>
            </>
                :
                <>
                    <UserOverview></UserOverview>
                </>}
        </div>
    );
};

export default Dashboard;