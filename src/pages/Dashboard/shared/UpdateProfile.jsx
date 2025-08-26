import React from 'react';
import BasicInfoUpdateForm from './components/BasicInfoUpdateForm';

const UpdateProfile = () => {
    return (
        <div className=''>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold text-primary text-center my-5'>Update Profile</h1>
            <BasicInfoUpdateForm></BasicInfoUpdateForm>
        </div>
    );
};

export default UpdateProfile;