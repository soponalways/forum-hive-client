import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { FaBackward, FaBars, FaTimes, FaHome, FaUser, FaPlus, FaClipboardList, FaUserShield, FaUsersCog, FaExclamationTriangle, FaBullhorn } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useGetRole from '../api/useGetRole';
import Loading from '../components/Loading';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const {user} = useAuth(); 
    // Role
    const {role, isLoading} = useGetRole(); 

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    let navLinks = [
        
    ];

    if(role === "admin") {
        navLinks = [
            { to: '/dashboard', label: 'Dashboard', Icon: <FaHome /> },
            { to: '/dashboard/admin-profile', label: 'Admin Profile', Icon: <FaUserShield /> },       // Bonus point 2
            { to: '/dashboard/manage-users', label: 'Manage Users', Icon: <FaUsersCog /> },
            { to: '/dashboard/reported-comments', label: 'Reported Activities', Icon: <FaExclamationTriangle /> },
            { to: '/dashboard/announcement', label: 'Make Announcement', Icon: <FaBullhorn /> },
            { to: '/', label: 'Back to Home', Icon: <FaBackward /> },
        ]
    }else {
        navLinks =[
            { to: '/dashboard', label: 'Dashboard', Icon: <FaHome /> },
            { to: '/dashboard/profile', label: 'Profile', Icon: <FaUser /> },
            { to: '/dashboard/add-post', label: 'Add Post', Icon: <FaPlus /> },
            { to: '/dashboard/my-posts', label: 'My Posts', Icon: <FaClipboardList /> },
            { to: '/', label: 'Back to Home', Icon: <FaBackward /> },
        ]
    }

    if(isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="flex min-h-screen">
            {/* Sidebar for desktop */}
            <div className="hidden md:flex md:w-64 bg-base-200 flex-col shadow-lg">
                <div className="p-4 text-lg font-bold border-b">ForumHive Dashboard</div>
                <div className="p-4 text-lg font-bold border-b">
                    {
                        user.photoURL && (
                            <img src={user.photoURL} alt="User Avatar" className="w-full h-auto hover:scale-105 transition rounded" />
                        )
                    }
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex gap-3 md:gap-4 items-center py-2 px-4 rounded bg-base-100 hover:bg-base-300 hover:scale-3d hover:scale-105 transition hover:drop-shadow-2xl hover:drop-shadow-primary ${location.pathname === link.to ? 'bg-secondary hover:bg-primary font-semibold' : ''
                                }`}
                        >
                            {link.Icon} {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden absolute top-4 right-4 hover:scale-105 z-50">
                <button onClick={toggleSidebar} className="text-2xl text-primary cursor-pointer">
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={closeSidebar}></div>
            )}

            {/* Sidebar for mobile */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-md transform z-50 transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4 text-lg font-bold border-b">ForumHive Dashboard</div>
                <div className="p-4 text-lg font-bold border-b">
                    {
                        user.photoURL && (
                            <img src={user.photoURL} alt="User Avatar" className="w-full h-auto hover:scale-105 transition rounded" />
                        )
                    }
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={closeSidebar}
                            className={`flex gap-3 md:gap-4 py-2 items-center px-4 rounded bg-base-100 hover:bg-base-300 hover:scale-3d hover:scale-105 transition hover:drop-shadow-2xl hover:drop-shadow-primary ${location.pathname === link.to ? 'bg-secondary hover:bg-primary font-semibold' : ''
                                }`}
                        >
                            {link.Icon} {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <main className="flex-1 bg-base-200 md:p-4 md:ml-14">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
