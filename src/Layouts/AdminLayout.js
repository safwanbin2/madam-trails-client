import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { RiAdminFill } from 'react-icons/ri';
import { BsFillBagFill } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';
import { SiGooglemessages } from 'react-icons/si';
import { FaBlog } from 'react-icons/fa';
import { MdCreateNewFolder, MdLocalMovies } from 'react-icons/md';

const AdminLayout = () => {
    const { logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleLogOut = () => {
        const consent = window.confirm("Are you sure you want to log out?");
        if (consent) {
            logOut()
                .then(() => {
                    toast.success("Logged out successfully")
                    navigate("/");
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err)
                    toast.error("Problem occured while logging out")
                })
        }
    }

    const sideLinks = <>
        <li>
            <Link to="/admin/orders/all" className="flex items-center p-2 rounded-lg   focus:border-b-2 border-b-2 border-transparent focus:border-primary">
                <BsFillBagFill className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/admins/all" className="flex items-center p-2 rounded-lg   focus:border-b-2 border-b-2 border-transparent focus:border-primary">
                <RiAdminFill className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Admins</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/users/all" className="flex items-center p-2 rounded-lg   focus:border-b-2 border-b-2 border-transparent focus:border-primary">
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Customers</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/products/all" className="flex items-center p-2 rounded-lg  hover::border-b-2 border-b-2 border-transparent focus:border-primary">
                <MdLocalMovies className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/products/add" className="flex items-center p-2 rounded-lg   focus:border-b-2 border-b-2 border-transparent focus:border-primary">
                <MdCreateNewFolder className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Add Product</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/blogs/all" className="flex items-center p-2 rounded-lg   focus:border-b-2 border-b-2 border-transparent focus:border-primary">
                <FaBlog className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Blog Posts</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/blogs/add" className="flex items-center p-2 rounded-lg   focus:border-b-2 border-b-2 border-transparent focus:border-primary">
                <MdCreateNewFolder className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Add Blog Post</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/messages/all" className="flex items-center p-2 rounded-lg   focus:border-b-2 border-b-2 border-transparent focus:border-primary">
                <SiGooglemessages className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
            </Link>
        </li>
        {/* signing out */}
        <li>
            <Link onClick={handleLogOut} className="flex items-center p-2 rounded-lg   focus:border-b-2 border-b-2 border-transparent focus:border-primary">
                <GoSignOut className='flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900' />
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
            </Link>
        </li>
    </>

    return (
        <section className='bg-base-100'>
            <nav className="fixed top-0 z-50 w-full bg-base border-b bg-base-100 shadow">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between px-4">
                        <Link to='/' className='text-primary text-2xl uppercase tracking-wider'>
                            <h2 className="">Working-Title</h2>
                        </Link>
                        <div className="flex md:hidden items-center justify-start">
                            <button onClick={() => handleToggle()} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="p-2 text-gray-700 rounded-md outline-none ">
                                <span className="sr-only">Open sidebar</span>
                                {
                                    isOpen ?
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                        :
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                }

                            </button>
                        </div>

                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={`${isOpen ? "-translate-x-full" : ""} shadow bg-base-100 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-base border-r border-gray-200 sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-base">
                    <ul className="space-y-2 font-medium">
                        {
                            sideLinks
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