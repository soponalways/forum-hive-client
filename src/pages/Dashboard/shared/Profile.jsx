import React from 'react';
import useGetRole from '../../../api/useGetRole';
import Loading from '../../../components/Loading';

const Profile = () => {
    const { role, isLoading } = useGetRole();

    if (isLoading) {
        return <Loading></Loading>
    }; 
    console.log("Loading State True on Shared Profile paege check role loading :", isLoading, role)
    return (
        <div className='space-y-4 md:space-y-6 lg:space-y-8'>
            {/* First Container  */}
            <div className='p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow shadow-primary bg-gray-500'>
                f
            </div>
            {/* Second Container  */}
            <div className='p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow shadow-primary bg-gray-500'>
                f
            </div>
            {/* 3rd Container  */}
            <div className='p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow shadow-primary bg-gray-500'>
                f
            </div>
        </div>
    );
};

export default Profile;