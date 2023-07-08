import React, { useContext, useEffect } from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { BsPerson, BsCart2 } from "react-icons/bs";
import { AiOutlineHeart } from 'react-icons/ai';
import { GrUserAdmin } from 'react-icons/gr';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const { user, countRefetch } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    // fetching for wishlist count
    useEffect(() => {
        fetch(`https://working-title-server.vercel.app/wishlist/mycount?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setWishlistCount(data.count))
    }, [user, countRefetch]);
    // fetching for cart count
    useEffect(() => {
        fetch(`https://working-title-server.vercel.app/cart/mycount?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setCartCount(data.count))
    }, [user, countRefetch]);

    const NavLinks = <>
        <li className='text-grey tracking-wider'>
            <Link to="/productspage">Find products</Link>
        </li>
        <li className="text-grey  tracking-wider">
            <Link to="/aboutus">About</Link>
        </li>
        <li className="text-grey  tracking-wider">
            <Link to="/blog">Blog</Link>
        </li>
        {isAdmin ? < li className='text-grey tracking-wider font-bold' >
            <Link className="flex items-center" to="/admin">
                <GrUserAdmin className='' />
                <span className="flex-1 ml-1 whitespace-nowrap">Dashboard</span>
            </Link>
        </li >
            : <>
                <li className="text-grey  tracking-wider">
                    <Link to="/contactus">Contact</Link>
                </li>
                <li className="text-grey  tracking-wider">
                    <Link to="/myorders">Orders</Link>
                </li>
                <li className="text-grey  dropdown dropdown-hover  me-4">
                    <Link to="/myprofile">
                        <p className='text-2xl'>
                            <BsPerson />
                        </p>
                    </Link>
                </li>
                <li className="text-grey font-semibold indicator me-4">
                    {wishlistCount ? <span className="indicator-item badge border-0 -top-1 text-primary p-0">{wishlistCount}</span> : ""}
                    <Link className='' to="/mywishlist">
                        <p className='text-2xl'>
                            <AiOutlineHeart />
                        </p>
                    </Link>
                </li>
                <li className="text-grey font-semibold indicator me-4">
                    {cartCount ? <span className="indicator-item badge border-0 -top-1 text-primary p-0">{cartCount}</span> : ""}
                    <Link to="/mycart">
                        <p className='text-2xl'>
                            <BsCart2 />
                        </p>
                    </Link>
                </li>
            </>}
    </>
    return (
        // bg-[#F8F8F8]
        <nav className="w-full bg-base-100 shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link className='text-primary text-2xl uppercase tracking-wider' to="/">
                            <h2 className="">Working-Title</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none "
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
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
                                ) : (
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
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-2 font-bold md:font-normal md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-4 md:flex md:space-x-8 md:space-y-0 uppercase text-sm">
                            {
                                NavLinks
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}