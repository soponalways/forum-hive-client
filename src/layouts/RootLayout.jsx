import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    // This layout wraps the main content with a header and footer
    // It also includes a loading component that can be displayed during data 
    return (
        <div>
            <header className='sticky top-0 z-50 bg-base-100'>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-64px)] bg-base-100 relative'>
                <Outlet />
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;