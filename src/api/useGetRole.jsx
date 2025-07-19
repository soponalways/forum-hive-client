import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetRole = () => {
    const {user} = useAuth(); 
    const axiosPublic = useAxios();
    const { data: role = "user", isLoading } = useQuery({
        queryKey: ['role', 'admin'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/role?email=${user.email}`)
            return data;
        }
    }); 
    return { role : role.role, isLoading }
};

export default useGetRole;