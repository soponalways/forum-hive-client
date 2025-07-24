import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUserShield } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../components/Loading';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [search, setSearch] = useState('');
    const [current , setCurrent] = useState(0)
    const axiosSecure = useAxiosSecure();

    

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', search, current],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/users`, {
                params : {
                    search, 
                    page : current, 
                }
            });
            return res.data;
        },
        enabled: !!search
    });

    const { data: totalCountsOfUsers = [] } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/users`, {
                params: {
                    search
                }
            });
            return res.data;
        },
        enabled: !!search
    })
    
    const handleMakeAdmin = async (user) => {
        Swal.fire({
            title: "Do you want to Make as Admin",
            showCancelButton: true,
            confirmButtonText: "Make Admin",
        }).then((result) => {
            if (result.isConfirmed) {
                const runDelete = async () => {
                    const res = await axiosSecure.patch(`/makeAdmin/${user?._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire("success!", `<div className='text-center'>
                        <p>You have successfully make an admin</p>
                        <p>${user.email}</p>
                        </div>`, "success");
                    }
                };
                runDelete();
            }
        });

    };

    const limit = 10;
    const totalPages = Math.ceil(totalCountsOfUsers.length / limit); 

    const pages = [...Array(totalPages).keys()]; 

    const handleLeft = () => {
        if (current > 0) {
            return setCurrent(prev => prev - 1)
        }
    }
    const handleRight = () => {
        if (current < pages.length - 1) {
            return setCurrent(prev => prev + 1)
        }
    }
    const handleDirectButton = v => {
        setCurrent(v)
    }
    
    // Conditional Rendering 
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <input
                type="text"
                placeholder="Search by username or email"
                className="input input-bordered w-full max-w-xs mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="overflow-x-auto">
                {users?.length === 0 ? <>
                    <div className='flex flex-col gap-2 md:gap-3 lg:gap-4 justify-center items-center mt-5 md:mt-7 lg:mt-10'>
                        <h2 className='text-lg md:text-xl lg:text-2xl font-medium lg:font-semibold '>You haven't searched yet.</h2>
                        <h2 className='text-lg md:text-xl lg:text-2xl font-medium lg:font-semibold '>Please Search a user via email or username</h2>
                        <p>Here You manage user, you can make a normal user to admin</p>
                    </div>
                </>
                    : <>
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Subscription</th>
                                    <th>Make Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.memberShip || 'Free'}</td>
                                        <td>
                                            {user.role === 'admin' ? (
                                                <span className="text-green-500 font-semibold">Admin</span>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-outline btn-primary"
                                                    onClick={() => handleMakeAdmin(user)}
                                                >
                                                    <FaUserShield className="mr-1" />
                                                    Make Admin
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table></>}
                    
                    <div>
                    {users.length > 0  && <div className='flex justify-between items-center w-3/4 mx-auto bg-white my-5 md:my-8 lg:my-10 rounded-lg py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 md:rounded-xl shadow shadow-secondary'>
                        <div>
                            <span className='text-gray-500 mr-1 md:mr-2 '>showing</span> 
                            <span className='text-gray-800 mr-1 md:mr-2  font-semibold'>{limit * current || 1}-{limit * current + users.length}</span>
                            <span className='text-gray-500 mr-1 md:mr-2 '>of</span> 
                            <span className='text-gray-800 mr-1 md:mr-2  font-semibold'>{totalCountsOfUsers.length}</span>
                            </div>
                        <div>
                            <div className='text-center '>
                                <span className='join join-horizontal'>
                                            <span className='btn bg-white text-black join-item' onClick={handleLeft}><FaArrowLeft></FaArrowLeft></span>
                                                {pages?.map(p => (
                                                    <button key={p} 
                                                    className={`btn border bg-primary-content text-black join-item ${current === p ? 'bg-primary/40 text-secondary' : ''}`} 
                                                        onClick={() => handleDirectButton(p)}
                                                    >{p}</button>
                                                ))}
                                            <span className='btn bg-white text-black join-item' onClick={handleRight}><FaArrowRight></FaArrowRight></span>
                                            </span>
                                        </div>
                        </div>
                        </div>}
                    </div>
            </div>
        </div>
    );
};

export default ManageUsers;
