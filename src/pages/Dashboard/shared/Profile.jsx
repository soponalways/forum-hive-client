import React from 'react';
import useGetRole from '../../../api/useGetRole';
import Loading from '../../../components/Loading';
import Avatar from '@mui/material/Avatar';
import useGetUserData from '../../../api/useGetUserData';
import { FaUserEdit } from 'react-icons/fa';

const Profile = () => {
    const { role, isLoading } = useGetRole();
    const [userData, userDataLoading] = useGetUserData(); 
console.log("UserDAta on the Profile page", userData, userDataLoading)
    if (isLoading || userDataLoading) {
        return <Loading></Loading>
    }; 
    return (
        <div className='space-y-4 md:space-y-6 lg:space-y-8'>
            {/* First Container  */}
            <div className='p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow shadow-primary bg-gray-100 text-black hover:shadow-2xl hover:shadow-primary border-gray-500 border'>
                <div className='flex gap-4 md:gap-5 lg:gap-6'>
                    <Avatar src={userData.image} alt='Sppon' ></Avatar>
                    <div>
                        <h2 className='text-lg md:text-xl font-semibold'>{userData.name}</h2>
                        <p><span>Role: {role}</span><span>{userData.Address && (<span>| {userData.Address}</span>)}</span></p>
                    </div>
                </div>
                <div>
                    <button className='btn '><FaUserEdit></FaUserEdit></button>
                </div>
            </div>
            {/* Second Container  */}
            <div className='p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow shadow-primary bg-gray-100 text-black hover:shadow-2xl hover:shadow-primary border-gray-500 border'>
                f
            </div>
            {/* 3rd Container  */}
            <div className='p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow shadow-primary bg-gray-100 text-black hover:shadow-2xl hover:shadow-primary border-gray-500 border'>
                f
            </div>
        </div>
    );
};

export default Profile;