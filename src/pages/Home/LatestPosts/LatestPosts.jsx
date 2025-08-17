import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../hooks/useAxios';
import PostCard from '../Home/PostCard';

const LatestPosts = () => {
    const axiosPublic = useAxios(); 
    const {data : latestPosts} = useQuery({
        queryKey: ['latestPosts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/latestPosts'); 
            return res.data; 
        }
    });
    console.log(latestPosts);
    return (
        <div>
            <Typography variant="h5" className="mb-6 text-primary">
                Latest Posts
            </Typography>
            <div className='mt-5 md:mt-7 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5'>
                {latestPosts?.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default LatestPosts;