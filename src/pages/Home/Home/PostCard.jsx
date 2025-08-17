import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaComments } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const PostCard = ({post, index}) => {
    const navigate = useNavigate(); 
    const axiosPublic = useAxios(); 
    const {data:comments =[]} = useQuery({
        queryKey: ['comments', post._id], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/comment/${post._id}`); 
            return res.data; 
        }
    })
    const onClick = () => {
        navigate(`/post/${post._id}`);
    }

    return (
        <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut', delay: index * 0.05 }}
            onClick={onClick}
            className="p-5 hover:drop-shadow-xl hover:drop-shadow-primary bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer duration-300 border border-base-200"
        >
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={post.authorImage}
                    alt="author"
                    className="w-12 h-12 rounded-full border border-secondary shadow"
                />
                <div>
                    <p className="font-semibold text-black text-lg">{post.authorName}</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">{post.title}</h2>
            <button className='mb-4 text-primary font-semibold btn btn-xs md:btn-sm btn-secondary hover:bg-primary/20 transition-colors duration-200  rounded-xl md:rounded-2xl'>
                See More
            </button><br />
            <p className="inline-block bg-secondary/10 text-secondary font-medium px-3 py-1 rounded-full text-sm mb-3">
                #{post.tag}
            </p>
           
            <div className="flex justify-between items-center text-black text-sm font-medium">
                <p className="flex items-center gap-1">
                    <FaComments className="text-primary" /> {comments.length} Comments
                </p>
                <p>Total Votes: {(post.upVote || 0) + (post.downVote || 0)}</p>
            </div>
        </motion.div>
    );
};

export default PostCard;