import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen pt-[64px] md:pt-[72px]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;