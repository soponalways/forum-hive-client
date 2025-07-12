import React from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const useSaveUser = () => {
    const axiosPublic = useAxios();
        const saveUser = async (userData) => {
            const res = await axiosPublic.post('/users', userData);
            return res.data;
        };
    const {mutateAsync: saveUserToDB } = useMutation({
        mutationFn: saveUser,
        onSuccess: (data) => {
            console.log('User saved successfully:', data);
            Swal.fire({
                title: 'Success',
                text: 'You have signed up successfully!',
                icon: 'success',
            });
        },
        onError: (error) => {
            console.error('Error saving user:', error);
        },
    });
    return { saveUserToDB };
};

export default useSaveUser;