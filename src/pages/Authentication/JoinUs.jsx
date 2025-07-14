import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation, Link } from 'react-router';
import Swal from 'sweetalert2';
import {  FaEye, FaEyeSlash } from 'react-icons/fa';
import gsap from 'gsap';
import Google from './shared/Google';
import useSaveUser from '../../api/useSaveUser';
import useAxios from '../../hooks/useAxios';

const JoinUs = () => {
    const { signIn, setLoading } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { saveUserToDB } = useSaveUser();
    const location = useLocation();
    const axiosPublic = useAxios(); 
    const from = location.state?.from || "/";

    const cardRef = useRef(null);
    const titleRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false);

    // GSAP animation for the card and title
    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(cardRef.current,
            { opacity: 0, rotateY: 90 },
            { opacity: 1, rotateY: 0, duration: 2, delay: 0.5, ease: "power4.out" }
        );
        gsap.to(titleRef.current, {
            color: ['#06b6d4',"#000", "#ff0000", "#000", ],
            duration: 1.5,
            repeat: -1,
            yoyo: true,
        });
    }, []);

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(async userCredential => {
                const signedInUser = userCredential.user;
                const result = await saveUserToDB({
                    email: signedInUser.email,
                })
                if (result) { 
                    // Set JWT token in cookies
                    try {
                        const handleSetCookie = async () => {
                            const cookieData = {
                                email: data.email,
                                createdAt: new Date().toISOString(),
                            }
                            await axiosPublic.post('/auth/set-cookie', cookieData, { withCredentials: true });
                        };

                        handleSetCookie();
                    } catch (error) {
                        console.error('Error setting JWT token:', error);

                    }
                    Swal.fire("Success", "Logged in successfully!", "success");
                    navigate(from, { replace: true });
                    setLoading(false); // Reset loading state after successful login
                }
            })
            .catch(err => {
                Swal.fire("Oops!", err.message, "error");
                setLoading(false); // Reset loading state on error
            });
    };

    return (
        <div 
            className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 overflow-hidden'
        >
            <div
                ref={cardRef}
                className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 transform perspective-1000 transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-secondary"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <h2
                    ref={titleRef}
                    className="text-3xl font-extrabold text-center text-slate-800"
                >
                    Login to ForumHive
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="label text-black">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password Field with Eye Toggle */}
                    <div>
                        <label className="label text-black">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="input input-bordered w-full pr-10"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters required" }
                                })}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-xl text-gray-600 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-info w-full text-white">
                        Login
                    </button>
                </form>

                {/* Divider with black text */}
                <div className="divider text-black">OR</div>

                {/* Social Login */}
                <Google from={from}></Google>

                {/* Toggle to Signup with black text */}
                <p className="text-center text-sm mt-4 text-black">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="font-semibold hover:underline text-black">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default JoinUs;
