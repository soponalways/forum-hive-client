import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router';

const AdminRoute = ({children}) => {
    const axiosPublic = useAxios(); 
    const {user} = useAuth(); 
    const navigate = useNavigate(); 
    const {data:role ="", isLoading} = useQuery({
        queryKey: ['role', 'admin'], 
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/role?email=${user.email}`)
            return data; 
        }
    }); 
    if(!user || role === 'admin') {
        navigate('/forbidden'); 
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return children
};

export default AdminRoute;