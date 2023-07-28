import React, { useContext, useEffect } from 'react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BsPerson, BsCart2 } from "react-icons/bs";
import { AiOutlineHeart } from 'react-icons/ai';
import { GrUserAdmin } from 'react-icons/gr';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';
import m from '../../../Assets/logo/m.png';
import { BiSearchAlt2 } from 'react-icons/bi';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [searchText, setSearchText] = useState("");
    const { user, countRefetch, userDB, setSubCategoryText } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const navigate = useNavigate();

    const handleSearchEnter = () => {
        if (searchText) {
            return navigate(`/productspage/${searchText}`)
        }
        navigate(`/productspage`)
    }

    // fetching for wishlist count
    useEffect(() => {
        fetch(`http://localhost:5000/wishlist/mycount?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setWishlistCount(data.count))
    }, [user, countRefetch, userDB]);
    // fetching for cart count
    useEffect(() => {
        fetch(`http://localhost:5000/cart/mycount?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setCartCount(data.count))
    }, [user, countRefetch, userDB]);

    const ProfileDropdownMenu = <div className='p-3'>
        <h2>Welcome!</h2>
        {
            user ?
                <div>
                    <p className='text-xl '>{user?.displayName}</p>
                    <Link className='text-primary' to="/myprofile">Profile</Link>
                </div>
                :
                <div className='mt-2'>
                    <Link to="/login" className={`hover:bg-white hover:border-primary hover:text-primary bg-primary text-white border-transparent px-2 py-1 text-sm md:text-base hover:shadow-lg border  transition-all duration-300 w-full`}>Login / Register</Link>
                </div>
        }
        <div className='divider my-2'></div>
        <div className='grid grid-cols-1 gap-1'>
            <div>
                <Link to="/mywishlist">Wishlist</Link>
            </div>
            <div>
                <Link to="/myorders">Orders</Link>
            </div>
            <div>
                <Link to="/mycart">Cart</Link>
            </div>
        </div>
    </div>

    const WomenDropdownMenu = <div className='p-3 grid grid-cols-2 gap-2 font-semibold'>
        <Link onClick={() => setSubCategoryText("fashion")} to={`/productspage/`}>Fashion</Link>
        <Link onClick={() => setSubCategoryText("makeup")} to={`/productspage/`}>Make Up</Link>
        <Link onClick={() => setSubCategoryText("skincare")} to={`/productspage/`}>Skin Care</Link>
        <Link onClick={() => setSubCategoryText("haircare")} to={`/productspage/`}>Hair Care</Link>
    </div>

    const NavLinks = <>
        <li className='text-grey tracking-wider'>
            {/* <Link to="/productspage">Find-products</Link> */}
            <form onSubmit={(e) => e.preventDefault()} className='flex bg-base-200 py-1 px-2 w-full gap-2 rounded-3xl'>
                {
                    searchText ?
                        <Link type="submit" to={`/productspage/${searchText}`} className='rounded-3xl flex justify-center items-center'>
                            {/* <img src={searchBtn} alt="" /> */}
                            <p className='text-2xl text-primary' >
                                <BiSearchAlt2 />
                            </p>
                        </Link>
                        :
                        <Link type="submit" to={`/productspage`} className='rounded-3xl flex justify-center items-center'>
                            {/* <img src={searchBtn} alt="" /> */}
                            <p className='text-2xl text-primary' >
                                <BiSearchAlt2 />
                            </p>
                        </Link>
                }
                <input onChange={(e) => setSearchText(e.target.value)} className=' outline-none bg-transparent rounded-full px-3 py-1 w-full' type='search' placeholder='Search for product' />
                <button className='hidden' onClick={handleSearchEnter} type='submit'>search</button>
            </form>
        </li>
        <li className="text-grey tracking-wider flex md:hidden">
            <Link to="/blog">Blogs</Link>
        </li>
        {isAdmin ? < li className='text-grey tracking-wider font-bold' >
            <Link className="flex items-center" to="/admin">
                <GrUserAdmin className='' />
                <span className="flex-1 ml-1 whitespace-nowrap">Dashboard</span>
            </Link>
        </li >
            : <>
                <li className="text-grey md:hidden tracking-wider">
                    <Link to="/myorders">my-Orders</Link>
                </li>
                <li className="text-grey dropdown dropdown-hover dropdown-end me-4 py-4 cursor-pointer hidden md:block">
                    <label tabIndex={0} className="flex flex-col justify-center items-center gap-[1px]">
                        <p className='text-xl mt-[.5px] text-primary'>
                            <BsPerson />
                        </p>
                        <p className='text-xs font-semibold'>Profile</p>
                    </label>
                    <div tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-md bg-base-100 mt-[18px] w-52 left-1/2 transform -translate-x-1/2">
                        {
                            ProfileDropdownMenu
                        }
                    </div>
                </li>
                <li className="text-grey font-semibold dropdown dropdown-hover me-4 md:hidden">
                    <Link className='flex flex-col justify-center items-center gap-[2px]' to="/myprofile">
                        <p className='text-xl mt-[.5px] text-primary'>
                            <BsPerson />
                        </p>
                        <p className='text-xs font-semibold'>Profile</p>
                    </Link>
                </li>
                <li className="text-grey md:hidden font-semibold indicator me-4">
                    {wishlistCount ? <span className="bg-transparent indicator-item badge border-0 -top-[2px] text-primary p-0">{wishlistCount}</span> : ""}
                    <Link className='flex flex-col justify-center items-center gap-[2px]' to="/mywishlist">
                        <p className='text-xl text-primary'>
                            <AiOutlineHeart />
                        </p>
                        <p className='text-xs font-semibold'>Wishlist</p>
                    </Link>
                </li>
                <li className="text-grey font-semibold indicator me-4">
                    {cartCount ? <span className="bg-transparent indicator-item badge border-0 -top-[2px] text-primary p-0">{cartCount}</span> : ""}
                    <Link className='flex flex-col justify-center items-center gap-[1px]' to="/mycart">
                        <p className='text-xl -mt-[.5px] text-primary'>
                            <BsCart2 />
                        </p>
                        <p className='text-xs font-semibold'>Cart</p>
                    </Link>
                </li>
            </>}
    </>

    return (
        <nav className={`bg-base-100 shadow z-10 transition-all duration-500 w-full fixed top-0 left-0`}>
            <div className={`${navbar ? "bg-base-100 shadow" : ""}`}>
                <div className="justify-between w-11/12 mx-auto md:items-center md:flex">
                    <div>
                        <div className="flex items-center justify-between md:block">
                            <ul className='flex justify-center items-center space-x-4 md:space-x-8 md:space-y-0 tracking-wider'>
                                <li>
                                    <Link className='text-primary text-2xl uppercase font-bold' to="/">
                                        <h2 className="">pending</h2>
                                        {/* <img className='h-[32px]' src={m} alt="" /> */}
                                    </Link>
                                </li>
                                <li>
                                    <li className=" cursor-pointer">
                                        <span className='font-semibold' to="/">Men</span>
                                    </li>
                                </li>
                                <li className=' dropdown dropdown-hover py-6'>
                                    <label tabIndex={0} className="flex flex-col justify-center items-center gap-[1px]">
                                        <p className=' font-semibold'>Women</p>
                                    </label>
                                    <div tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-md bg-base-100 mt-[24px] w-52 left-1/2 transform -translate-x-1/2">
                                        {
                                            WomenDropdownMenu
                                        }
                                    </div>
                                </li>
                                <li>
                                    <li className="text-grey tracking-wider hidden md:flex">
                                        <Link className='font-semibold' to="/blog">Blogs</Link>
                                    </li>
                                </li>
                            </ul>
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
                            <ul className={`items-center justify-center space-y-4 md:flex md:space-x-8 md:space-y-0 tracking-wider text-sm`}>
                                {
                                    NavLinks
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}