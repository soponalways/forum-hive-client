// ProfileDropdown.js
import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router';
import { CiUser } from 'react-icons/ci';
import { GrDashboard } from 'react-icons/gr';
import { CiLogout } from 'react-icons/ci';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ProfileDropdown = ({ userName, avatarUrl }) => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const clearCookies = () => {
        // Clear cookies logic here
        document.cookie.split(";").forEach((c) => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
    }

    const handleLogout = async () => {
        // Implement logout logic here
            logOut();
            console.log('User logged out successfully');
            Swal.fire("Logout Successful", "You have been logged out successfully.", "success");
            //  redirect to home or login page
            navigate('/');
            clearCookies();
    }
    return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex items-center space-x-2 p-2 rounded-full hover:bg-secondary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-12 h-12 hover:scale-105 cursor-pointer">
                        <img
                            src={avatarUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 hover:shadow-2xl hover:shadow-secondary duration-200 ">
                        <Menu.Item>
                            {({ active }) => (
                                <span
                                    className={`flex gap-2 items-center px-4 py-2 text-sm text-gray-900 ${active ? 'bg-secondary' : ''
                                        }`}
                                >
                                    <CiUser /> {userName}
                                </span>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/dashboard"
                                    className={`flex gap-2 items-center px-4 py-2 text-sm text-gray-900 ${active ? 'bg-secondary' : ''
                                        }`}
                                >
                                    <GrDashboard />  Dashboard
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleLogout}
                                    className={`flex gap-2 items-center w-full text-left px-4 py-2 text-sm text-red-600 cursor-pointer ${active ? 'bg-secondary' : ''
                                        }`}
                                >
                                    <CiLogout /> Logout
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default ProfileDropdown;
