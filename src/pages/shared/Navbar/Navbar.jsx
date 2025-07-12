import React from 'react';
import { Link, NavLink } from 'react-router';
import ForumHiveLogo from '../ForumHiveLogo/ForumHiveLogo';

const Navbar = () => {

    const navItems = <>
        <li><NavLink className={'btn btn-secondary mx-1 hover:scale-105 duration-300 transition-transform'} to="/">Home</NavLink></li>
        <li><NavLink className={'btn btn-secondary mx-1 hover:scale-105 duration-300 transition-transform'} to="/membership">Membership</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <span>
                    <ForumHiveLogo></ForumHiveLogo>
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end gap-3 md:gap-4">
                <button className="btn btn-ghost btn-circle bg-secondary hover:scale-105 duration-300 transition-transform">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                        <span className="badge badge-xs badge-primary indicator-item">8</span>
                    </div>
                </button>
                <Link to="/Join-us" className='btn btn-secondary hover:scale-105 duration-300 transition-transform'>Join Us</Link>
            </div>
        </div>
    );
};

export default Navbar;