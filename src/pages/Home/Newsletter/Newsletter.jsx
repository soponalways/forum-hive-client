import React from 'react';
import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { toast } from 'react-toastify';

const Newsletter = () => {
    const axios = useAxios();
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/newsletter", { email });
            const data = await res.data;
            setMsg(data.message);
            toast.success(data.message);
            setEmail("");
        } catch (err) {
            setMsg("Failed to subscribe.");
            toast.warn(err.message);
        }
    };
    return (
        <div className='relative'>
            <div className='absolute inset-0 bg-black/40 pointer-events-none'></div>
            <div className='bg-[url(https://res.cloudinary.com/dthmavlxj/image/upload/v1755436929/Newssletter_image_jpasx1.jpg)] bg-no-repeat bg-cover text-primary shadow-md rounded-lg p-3 md:p-5 lg:p-6'>
                <div className='relative'>
                    <div>
                        <h2 className=" text-center text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold">Subscribe to our Newsletter</h2>
                        <p className="text-center text-lg font-semibold">Get the latest updates and news directly in your inbox.</p>
                    </div>
                    {/* Form of the newsletter  */}
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2 mt-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                        <div>
                            <button type="submit" className="btn btn-primary w-fit"> Subscribe</button>
                        </div>
                    </form>
                        <p>{msg && <p className="mt-3 text-success">{msg}</p>}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default Newsletter;