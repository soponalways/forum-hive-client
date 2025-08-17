import { useLocation, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown, FaCommentDots, FaShareAlt } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import SkeletonPostCard from '../Home/Home/SkeletonPostCard';

const PostDetails = () => {
    const { user } = useAuth();
    const { PostId:id } = useParams();
    const [isVisibleComments , setIsVisibleComments] = useState(false)
    const axiosPublic = useAxios();
    const { pathname } = useLocation(); 
    const origin = window.location.origin; 
    const shareUrl = `${origin}${pathname}`;

    const [commentText, setCommentText] = useState('');

    const { data: post, refetch } = useQuery({
        queryKey: ['postDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(pathname);
            return res.data;
        }
    });

    const {data:comments =[] , isLoading:commentIsLoading, refetch:commentsRefetch} = useQuery({
        queryKey: ['comments', id], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/comment/${id}`); 
            return res.data; 
        }, 
    }); 

    const handleVote = async (type) => {
        if (!user) return Swal.fire('Login required', 'Please login to vote.', 'warning');
        try {
            const res = await axiosPublic.patch(`/post/vote/${id}`, { type });
            if (res.data.modifiedCount > 0) {
                refetch()
            } else {
                Swal.fire('Already Voted', 'You cannot vote more than once.', 'info');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleComment = async () => {
        if (!user) return Swal.fire('Login required', 'Please login to comment.', 'warning');
        if (!commentText.trim()) return;

        const res = await axiosPublic.post(`/post/comment`, {
            postId: id,
            email: user.email,
            name: user.displayName,
            image: user.photoURL,
            comment: commentText,
        });

        if(res.data.insertedId) {
            Swal.fire("success", `
                <p className='text-center font-semibold'>You have Successfully Comment add.</p>
                `, 'success')
        }
        setCommentText('');
        commentsRefetch(); 
    };

    if (!post) return <div className="max-w-4xl mx-auto px-4 py-10">
        <SkeletonPostCard />
    </div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg p-6 rounded-xl text-primary">
                <div className="flex items-center gap-4 mb-4">
                    <img src={post.authorImage} alt="Author" className="w-12 h-12 rounded-full" />
                    <div>
                        <h2 className="font-bold">{post.authorName}</h2>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                <p className="mb-4 text-gray-700">{post.description}</p>
                <div className="mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">#{post.tag}</span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => handleVote('up')} className="btn btn-sm btn-outline">
                        <FaThumbsUp /> {post?.upVote}
                    </button>
                    <button onClick={() => handleVote('down')} className="btn btn-sm btn-outline">
                        <FaThumbsDown /> {post?.downVote}
                    </button>
                    <div 
                    onClick={() => setIsVisibleComments(prev => !prev)}
                    className="flex items-center gap-2 cursor-pointer hover:scale-125">
                        <FaCommentDots /> {comments?.length}
                    </div>
                    <div className="flex gap-2">
                        <FacebookShareButton url={shareUrl}><FacebookIcon size={32} round /></FacebookShareButton>
                        <TwitterShareButton url={shareUrl}><TwitterIcon size={32} round /></TwitterShareButton>
                        <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round /></WhatsappShareButton>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        rows="3"
                        placeholder="Write your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button onClick={handleComment} className="btn btn-primary mt-2">Comment</button>
                </div>

                <div className="mt-8">
                    {isVisibleComments && (
                        <>
                           {comments.length === 0 ? 
                           <>
                           <p className='font-semibold text-2xl text-center'>No comments yet</p>
                           </>
                           : <>
                                <h3 className="text-lg font-semibold mb-4">All Comments</h3>
                                <div>
                                    {commentIsLoading && <p>Comments Loading...</p>}
                                    {comments?.map((comment, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10, y: 10 }}
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            whileHover={{ y: -7, backgroundColor: '#87CEEB', color: '#00000' }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="mb-4 border-b pb-2 px-2 md:px-3 lg:px-4 py-1 md:py-3 lg:py-4 rounded-lg md:rounded-xl lg:rounded-2xl bg-base-content"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <img src={comment.image} alt="" className="w-8 h-8 rounded-full" />
                                                <p className="font-semibold">{comment.name}</p>
                                            </div>
                                            <p className='text-black'>{new Date(comment.createdAt).toLocaleString()}</p>
                                            <p className="text-gray-700 text-sm">{comment.comment}</p>
                                        </motion.div>
                                    ))}
                                </div>
                           </>}
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PostDetails;
