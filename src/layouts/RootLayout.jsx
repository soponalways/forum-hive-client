import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';

const RootLayout = () => {
    // This layout wraps the main content with a header and footer
    // It also includes a loading component that can be displayed during data 

    const {loading } = useAuth(); 
    return (
        <div>
            <header className='sticky top-0 z-50 bg-base-100'>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-64px)] bg-base-100 relative'>
                {loading || <Outlet />}
                {/* Loading component can be used here if needed */}
                <div className='absolute inset-10 z-10 top-0 flex items-center justify-center'>
                    {loading && <Loading />}
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;