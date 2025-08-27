import React from 'react';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';

const useGetUserData = () => {
    const {user} = useAuth(); 
    const axios = useAxios(); 
    console.log("user on user data api", user); 
    const {data, isLoading} = useQuery({
        queryKey: ["userdata"], 
        queryFn: async () => {
            const res = await axios.get(`/userdata/${user.email}`); 
            return res.data; 
        }
    })
    return [data, isLoading]
};

export default useGetUserData;