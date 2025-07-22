import useAxios from '../../../../hooks/useAxios';
import CommentRow from './CommentRow'; 
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../components/Loading';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'motion/react'

const Comment = () => {
    const axiosPublic = useAxios();
    const { postId } = useParams(); 
    const [openModal, setOpenModal] = useState(false);
    const [modalComment , setModalComment] = useState();

    const { data: comments =[], isLoading} = useQuery({
        queryKey: ['comment', postId], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/comment/${postId}`); 
            return res.data; 
        }
    })

    const handleModal = comment => {
        setModalComment(comment); 
        setOpenModal(true)
    }
    
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <Helmet>
                <title>ForumHive | Comments</title>
            </Helmet>

            <h1 className="text-2xl font-bold mb-4">All Comments</h1>

            {comments?.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No comments found.
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                    <table className="table table-zebra max-w-screen">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Comment</th>
                                <th>Feedback</th>
                                <th>Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments?.map((comment) => (
                                <CommentRow handleModal={handleModal} key={comment._id} comment={comment} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            {openModal && (
                <Dialog open={openModal} onClose={() => setOpenModal(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
                        >
                            <Dialog.Title className="font-bold text-lg mb-2 text-black">Full Comment</Dialog.Title>
                            <p className='text-black font-medium'>Commenter email: {modalComment?.email}</p>
                            <p className='text-black'>{modalComment?.comment}</p>
                            <button className="btn btn-sm btn-primary mt-4" onClick={() => setOpenModal(false)}>Close</button>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default Comment;
