import React, { useState } from 'react';
import useGetRole from '../../../api/useGetRole';
import Loading from '../../../components/Loading';
import Avatar from '@mui/material/Avatar';
import useGetUserData from '../../../api/useGetUserData';
import { FaFacebook, FaLinkedinIn, FaTwitter, FaUserEdit } from 'react-icons/fa';
import Button from './components/Button';
import { Link, Navigate } from 'react-router';

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
            <div className='flex justify-between p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow shadow-primary bg-gray-100 text-black hover:shadow-2xl hover:shadow-primary border-gray-500 border'>
                <div className='flex gap-4 md:gap-5 lg:gap-6'>
                    <Avatar src={userData?.image} alt='Sppon' ></Avatar>
                    <div>
                        <h2 className='text-lg md:text-xl font-semibold'>{userData?.name}</h2>
                        <p><span>Role: {role}</span><span>{userData?.Address && (<span>| {userData?.Address}</span>)}</span></p>
                    </div>
                </div>
                <div className='flex gap-3 md:gap-4 lg:gap-5'>
                    <div className='flex gap-1 md:gap-2 '>
                        {userData?.twitter && <Button><Link to={userData?.twitter}><FaTwitter size={24}></FaTwitter></Link></Button>}
                        {userData?.linkedin && <Button><Link to={userData?.twitter}><FaLinkedinIn size={24}></FaLinkedinIn></Link></Button>}
                        {userData?.facebook && <Button><Link to={userData?.twitter}><FaFacebook size={24}></FaFacebook></Link></Button>}
                    </div>
                    <Link to='/dashboard/profile/update'><Button><FaUserEdit size={24}></FaUserEdit></Button></Link>
                </div>
            </div>
            {/* Second Container  */}
            <div className='p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl shadow shadow-primary bg-gray-100 text-black hover:shadow-2xl hover:shadow-primary border-gray-500 border'>
                {/* User Info */}
                <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                    <p className="text-sm">{userData.phone}</p>
                    <p className="text-sm">DOB: {userData.dob}</p>
                    <p className="text-sm">Gender: {userData.gender}</p>
                    <p className="text-sm">Address: {userData.address}</p>
                    <p className="text-sm">Country: {userData.country}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;