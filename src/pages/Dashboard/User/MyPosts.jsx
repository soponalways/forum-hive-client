import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import { FaComments, FaTrash } from 'react-icons/fa';
import Loading from '../../../components/Loading';
import { Link, useNavigate } from 'react-router'

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate(); 

    const { data: myPosts = [], refetch, isLoading } = useQuery({
        queryKey: ['my-posts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/user/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/posts/${id}`);
                Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                refetch();
            } catch (error) {
                console.error('Error deleting post:', error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto w-full bg-white rounded-xl shadow p-4"
        >
            <h2 className="text-2xl font-semibold mb-4 text-black">My Posts</h2>
            <h3 className="text-lg font-semibold mb-2 text-black">Your personal posts</h3>
            <p className="text-gray-600 mb-4">Here you can manage your posts.</p>
            <p className='text-black font-semibold mb-2'>{myPosts.length} posts found of {user?.email}</p>

            {isLoading ? (
                <Loading />
            ) : myPosts.length === 0 ? (
                <>
                    <p className="text-center text-gray-500 font-semibold md:font-bold  text-xl md:text-2xl">You haven’t added any posts yet.</p>
                    <p className='text-center text-gray-500 font-semibold md:font-bold  text-xl md:text-2xl'>Please <Link to="/dashboard/user/add-post" className="text-blue-500">add a new post</Link>.</p>
                </>
            ) : (
                <table className="table w-full">
                    <thead>
                        <tr className="text-black">
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Votes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPosts.map((post, index) => (
                            <motion.tr
                                key={post._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-primary-content text-black transition-colors duration-200 hover:drop-shadow-md hover:drop-shadow-primary"
                            >
                                <td>{index + 1}</td>
                                <td className="font-medium text-black">{post.title}</td>
                                <td className="text-black">{(post.upVote || 0) + (post.downVote || 0)}</td>
                                <td className="space-x-2">
                                    <button onClick={() => navigate(`/dashboard/comment/${post._id}`)} className="btn btn-sm btn-outline btn-info">
                                        <FaComments className="mr-1" /> Comment
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="btn btn-sm btn-outline btn-error"
                                    >
                                        <FaTrash className="mr-1" /> Delete
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            )}
        </motion.div>
    );
};

export default MyPosts;
