import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';

const MemberShip = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxios(); 
    const {user} = useAuth(); 
        const { data: memberShipStatus ={} } = useQuery({
            queryKey: ['postLimit'], 
            queryFn: async () => {
                try {
                    const res = await axiosPublic.get(`membershipStatus/${user.email}`);
                    return res.data; 
                } catch (err) {
                    console.error(err);
                }
            }
        })
    
    const handleBuyPlan = () => {
        // Navigate to payment page with plan details
        navigate('/payment', {
            state: {
                plan: 'Pro',
                price: 200,
                benefits: 'Get 5 more post slots',
            },
        });
    };

    if (memberShipStatus.memberShip === "member") {
        return (
            <div className='flex flex-col gap-4 md:gap-6 lg:gap-8 justify-center items-center min-h-screen'>
                <h2 className='text-2xl md:text-3xl font-medium md:font-semibold'>Sorry You cann't Get Membership</h2>
                <p className='text-lg md:text-xl font-medium md:font-semibold'>You are already Member Of Forum Hive Website. </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-white text-gray-900 shadow-2xl rounded-2xl p-8 max-w-md w-full"
            >
                <h2 className="text-3xl font-bold text-center mb-6">Pro Membership</h2>

                <ul className="space-y-4 mb-6">
                    <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-600" />
                        <span>Post 5 more items</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-600" />
                        <span>Priority posting</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-600" />
                        <span>Early access to new features</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-600" />
                        <span>Get the Gold badge</span>
                    </li>
                </ul>

                <div className="text-center text-4xl font-extrabold text-purple-700 mb-6">
                    $200
                </div>

                <button
                    onClick={handleBuyPlan}
                    className="cursor-pointer w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
                >
                    Become a Member
                </button>
            </motion.div>
        </div>
    );
};

export default MemberShip;
