import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../hooks/useAxios';

const Leaderboard = () => {
    const axios = useAxios();
    const { data: leaders = [], isLoading} =useQuery({
        queryKey: ['users', 'leaderboard'], 
        queryFn: async () => {
            const res = await axios.get("/leaderboard"); 
            return res.data; 
        }
    })
    if (isLoading) <div className='text-primary'>Loading...</div>
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">
                    🏆 ForumHive Leaderboard
                </h1>
                <div className="overflow-x-auto">
                    <table className="table w-full shadow-xl rounded-2xl">
                        <thead>
                            <tr className="bg-base-300 text-base font-semibold">
                                <th>#</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((user, i) => (
                                <tr key={user._id} className="shadow hover:shadow-primary">
                                    <td>{i + 1}</td>
                                    <td className="flex items-center gap-3">
                                        <img
                                            src={user.image || "https://i.pravatar.cc/12"}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span>{user.name}</span>
                                    </td>
                                    <td>{user.email}</td>
                                    <td className="font-bold text-secondary">{user.points || 50 + i + i}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;