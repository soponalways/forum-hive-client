import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaJs, FaReact, FaNodeJs, FaServer, FaDatabase, FaLaptopCode, FaCode, FaFireAlt, FaCss3Alt, FaGitAlt, FaCloudUploadAlt, FaUserTie, FaRegLightbulb, FaQuestion } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../../hooks/useAxios';


const AddPost = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [postLimitReached, setPostLimitReached] = useState(false);
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxios(); 

    const { data:tagOptions= []} = useQuery({
        queryKey : ['tags'], 
        queryFn: async () => {
            const res = await axiosPublic.get('/tags'); 
            return res.data; 
        }
    })

    const {data } = useQuery({
        queryKey: ['postLimit'], 
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/posts/user/${user.email}/count`);
                if (res.data.count >= 5) {
                    setPostLimitReached(true);
                }
                return res.data; 
            } catch (err) {
                console.error(err);
            }
        }
    })

    const onSubmit = async (data) => {
        const postData = {
            authorName: user.displayName,
            authorEmail: user.email,
            authorImage: user.photoURL,
            title: data.title,
            description: data.description,
            tag: data.tag.value,
            upVote: 0,
            downVote: 0,
            createdAt: new Date().toISOString(),
        };

        try {
            await axiosSecure.post('/posts', postData);
            Swal.fire('Success', 'Post created successfully!', 'success');
            reset();
            navigate('/dashboard/my-posts');
        } catch (err) {
            Swal.fire('Error', 'Failed to create post.', 'error');
            console.error(err);
        }
    };

    if (postLimitReached) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                <h2 className="text-2xl font-semibold text-red-500">Post limit exceeded!</h2>
                <p className="text-base">You can only add up to 5 posts as a normal user.</p>
                <button onClick={() => navigate('/membership')} className="btn btn-primary">Become a Member</button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Add New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="text"
                    disabled
                    defaultValue={user.displayName}
                    className="input input-bordered w-full"
                    {...register('authorName')}
                />

                <input
                    type="email"
                    disabled
                    defaultValue={user.email}
                    className="input input-bordered w-full"
                    {...register('authorEmail')}
                />

                <input
                    type="text"
                    placeholder="Post Title"
                    className="input input-bordered w-full"
                    {...register('title', { required: true })}
                />
                {errors.title && <p className="text-red-500">Title is required</p>}

                <textarea
                    placeholder="Post Description"
                    className="textarea textarea-bordered w-full"
                    rows="5"
                    {...register('description', { required: true })}
                ></textarea>
                {errors.description && <p className="text-red-500">Description is required</p>}

                <Controller
                    name="tag"
                    control={control}
                    defaultValue={tagOptions[0]}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={tagOptions}
                            className="w-full text-black"
                            getOptionLabel={(e) => (
                                <div className="flex items-center gap-2">
                                    <span>{e.label}</span>
                                </div>
                            )}
                        />
                    )}
                />

                <button type="submit" className="btn btn-primary w-full">Submit Post</button>
            </form>
        </motion.div>
    );
};

export default AddPost;
