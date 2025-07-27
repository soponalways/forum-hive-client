import React from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetPosts = ({ sort,  current , limit}) => {
    const axiosPublic = useAxios();
    const queryFn = async () => {
        try {
            const response = await axiosPublic.get('/posts', {
                params: {
                    sort,
                    limit, 
                    current
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    };

    const getPosts = useQuery({
        queryKey: ['posts', sort , limit, current],
        queryFn, 
    })

    return getPosts;
};

export default useGetPosts;
