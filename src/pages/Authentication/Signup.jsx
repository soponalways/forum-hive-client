import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import gsap from 'gsap';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import useSaveUser from '../../api/useSaveUser';
import Google from './shared/Google';

const Signup = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic =  useAxios();
    const { saveUserToDB } = useSaveUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const password = watch('password');
    const navigate = useNavigate();

    const cardRef = useRef();
    const titleRef = useRef();
    const containerRef = useRef();
    const glowRef = useRef();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    const location = useLocation();
    const from = location.state?.from || "/";

    const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;
    // GSAP animation for the card and title
    useEffect(() => {
        gsap.fromTo(cardRef.current, { opacity: 0, rotateY: 90 }, { opacity: 1, rotateY: 0, duration: 2, delay: 0.5, ease: "power4.out" });
        gsap.to(titleRef.current, { color: ["#06b6d4", "#3b82f6", "#9333ea" , "#f43f5e"], duration: 1.5, repeat: -1, yoyo: true });
    }, []);

    // Mouse follower effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${x - 64}px, ${y - 64}px)`;
            }
        };
        const container = containerRef.current;
        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Check if username exists
    const checkUsername = async (username) => {
        const res = await axiosPublic.get(`/users/check-username/${username}`);
        return res.data.exists;
    };

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            return Swal.fire('Error', 'Passwords do not match!', 'error');
        }

        try {
            const exists = await checkUsername(data.username);
            if (exists) return Swal.fire('Error', 'Username already taken', 'error');

            const formData = new FormData();
            formData.append('image', data.profileImage[0]);
            const imgbbRes = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${imgbbAPI}`, formData);
            const imageUrl = imgbbRes.data.data.url;

            const userCredential = await createUser(data.email, data.password);
            await updateUserProfile({ displayName: data.name, photoURL: imageUrl });

            const createdAt = new Date();
            const userData = {
                name: data.name,
                username: data.username,
                email: data.email,
                role : 'user',
                uid: userCredential.user.uid,
                image: imageUrl,
                createdAt: createdAt.toISOString(),
                lastSignIn: createdAt.toISOString()
            };
            // Save user to the database

            const result = await saveUserToDB(userData);
            console.log('result on signup page', result);

            Swal.fire('Success', 'Account created successfully!', 'success');
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            Swal.fire('Error', err.message, 'error');
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 overflow-hidden"
        >
            <div
                ref={glowRef}
                className="pointer-events-none absolute w-32 h-32 rounded-full bg-primary/30 \
                   shadow-[0_0_40px_theme('colors.primary')] blur-2xl transition-opacity \
                   duration-300 opacity-80 z-10"
            ></div>

            <div
                ref={cardRef}
                className="relative z-20 bg-white/90 backdrop-blur-md shadow-2xl \
                   rounded-2xl p-8 w-full max-w-md space-y-6 transition duration-300 \
                   ease-in-out hover:-translate-y-2 hover:shadow-secondary"
            >
                <h2 ref={titleRef} className="text-3xl font-bold text-center text-slate-800">
                    Create ForumHive Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="input input-bordered w-full"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                    </div>
                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            placeholder="Choose a unique username"
                            className="input input-bordered w-full"
                            {...register('username', { required: true })}
                        />
                        {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
                    </div>
                    {/* Email */}
                   <div>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="input input-bordered w-full"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                   </div>
                    {/* Profile Image */}
                    <div>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            {...register('profileImage', { required: true })}
                        />
                        {errors.profileImage && <p className="text-red-500 text-sm">Profile image is required</p>}
                    </div>
                    {/* Password password */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
                            className="input input-bordered w-full pr-10"
                            {...register('password', { required: true, minLength: 6 })}
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                        {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
                    </div>
                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            className="input input-bordered w-full pr-10"
                            {...register('confirmPassword', { required: true , validate: value => value === password || "Passwords do not match" })}
                        />
                        <span onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer">
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button type="submit" className="btn btn-info w-full text-white">
                        Sign Up
                    </button>
                </form>

                <div className="divider text-black">OR</div>

                <Google from={from}></Google>

                <p className="text-center text-sm text-black mt-4">
                    Already have an account?{' '}
                    <Link to="/Join-us" className="font-semibold hover:underline text-black">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
