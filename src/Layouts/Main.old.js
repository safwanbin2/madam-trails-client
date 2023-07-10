import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
// import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
// import { toast } from 'react-hot-toast';
// import { RiAdminFill } from 'react-icons/ri';
// import {  GoSignOut } from 'react-icons/go';
// import { AiOutlineMail } from 'react-icons/ai';
// import { MdCreateNewFolder, MdLocalMovies } from 'react-icons/md';
// import film from '../Assets/film.png';

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const NavItemsTop = <>
        <li>
            <Link to="/" className='mx-4'>Home</Link>
        </li>
        <li>
            <Link to="/" className='mx-4'>Home</Link>
        </li>
        <li>
            <Link to="/" className='mx-4'>Home</Link>
        </li>
    </>

    const NavItemsSide = <>
        <li>
            <Link to="/admin/dashboard/messages" className="flex items-center p-2  rounded-lg  hover:bg-gray-600 focus:border-b-2 border-b-2 border-transparent focus:border-white">
                <AiOutlineMail className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/dashboard/messages" className="flex items-center p-2  rounded-lg  hover:bg-gray-600 focus:border-b-2 border-b-2 border-transparent focus:border-white">
                <AiOutlineMail className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/dashboard/messages" className="flex items-center p-2  rounded-lg  hover:bg-gray-600 focus:border-b-2 border-b-2 border-transparent focus:border-white">
                <AiOutlineMail className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
            </Link>
        </li>
    </>

    return (
        <section>
            <nav className="fixed top-0 z-50 w-full bg-base border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between px-4">
                        <Link to='/' className='hidden md:flex justify-center items-center tracking-wider text-2xl font-semibold'>
                            <h2>MadamTrails</h2>
                        </Link>
                        <div className="flex items-center justify-start">
                            <button onClick={() => handleToggle()} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 ">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3 relative">
                                <ul className="flex flex-row font-medium rounded-lg bg-base">
                                    {NavItemsTop}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={`${isOpen ? "-translate-x-full" : ""} fixed top-0 left-0 z-40 w-64 h-screen pt-[64px] md:pt-[56px] transition-transform bg-white  sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 border-r shadow-md overflow-y-auto bg-base dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {
                            NavItemsSide
                        }
                    </ul>
                </div>
            </aside>
            {/* display */}
            <div className='mr-8 ml-8 md:ml-72 my-20'>
                <Outlet />
            </div>
        </section>
    );
};

export default AdminLayout;