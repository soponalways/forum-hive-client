import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const ForumHiveLogo = () => {
    return (
        <Link to="/">
            <div className='flex flex-col items-center justify-center'>
                <img
                    className='mb-2 w-44 rounded-lg md:rounded-xl hover:scale-105 transition-transform duration-300'
                    src={logo} alt="" />
            </div>
        </Link>
    );
};

export default ForumHiveLogo;