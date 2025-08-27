import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import { FaMedal } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UserOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); 

    const { data: userInfo = {} } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const { data: myPosts = [] } = useQuery({
        queryKey: ['myRecentPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/user/${user.email}?limit=3`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const badgeType = userInfo?.memberShip === 'member' ? 'gold' : 'bronze';
    const badgeLabel = badgeType === 'gold' ? 'Gold Badge - Pro Member' : 'Bronze Badge - Registered User';
    const badgeColor = badgeType === 'gold' ? 'text-yellow-400' : 'text-amber-700';

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="bg-whitef bg-secondary hover:bg-primary duration-300 shadow-xl rounded-2xl p-6 flex flex-col items-center text-center">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="User Avatar"
                    className="w-28 h-28 rounded-full border-4 border-gray-300 mb-4"
                />
                <h2 className="text-2xl font-bold mb-1 ">{user?.displayName}</h2>
                <p className="text-gray-600 mb-3">{user?.email}</p>
                <div className="flex items-center gap-2 mb-6">
                    <FaMedal className={`text-3xl ${badgeColor}`} title={badgeLabel} />
                    <span className={`font-semibold ${badgeColor}`}>{badgeLabel}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">My Recent Posts</h3>
                <div className="w-full grid gap-4">
                    {myPosts.length === 0 && <p className="text-gray-500">No posts found.</p>}
                    {myPosts.map((post) => (
                        <motion.div
                            key={post._id}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="bg-gray-50 p-4 rounded-xl shadow-md border"
                        >
                            <h4 className="text-lg font-semibold text-black mb-1">{post.title}</h4>
                            <p className="text-sm text-gray-600 mb-1">Tags: {post.tags?.join(', ')}</p>
                            <p className="text-xs text-gray-400">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
                            <Link
                                to={`/post/${post._id}`}
                                className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                            >
                                View Details
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserOverview;
