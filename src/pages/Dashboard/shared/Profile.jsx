import React, { useState } from 'react';
import useGetRole from '../../../api/useGetRole';
import Loading from '../../../components/Loading';
import Avatar from '@mui/material/Avatar';
import useGetUserData from '../../../api/useGetUserData';
import { FaFacebook, FaLinkedinIn, FaTwitter, FaUserEdit } from 'react-icons/fa';
import Button from './components/Button';
import Modal from './components/Modal';

const Profile = () => {
    const { role, isLoading } = useGetRole();
    const [userData, userDataLoading] = useGetUserData();
    const [modalOpen , SetModalOpen] = useState(false); 
    const handleModaleOpen = () => {
        SetModalOpen(prev => !prev); 
    }
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
                        <Button><FaFacebook size={24}></FaFacebook></Button>
                        <Button><FaLinkedinIn size={24}></FaLinkedinIn></Button>
                        <Button><FaTwitter size={24}></FaTwitter></Button>
                    </div>
                    <Button onClick={handleModaleOpen}><FaUserEdit size={24}></FaUserEdit></Button>
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


            {/* Modal reltaed space */}
            <Modal open={modalOpen} handleOpen={handleModaleOpen}></Modal>
        </div>
    );
};

export default Profile;