import React from 'react';
import "./Banner.css";
import { Link } from 'react-router-dom';
import beauty from '../../../Assets/Banner/beauty.png';

const Banner = () => {
    return (
        <div className='flex flex-col justify-center bg-[#FFDDEE]'>
            <div className='banner w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center'>
                <div className=''>
                    <h1 className='text-3xl text-grey uppercase tracking-wider leading-10'>Discover <br /><span className='text-primary'>Beauty</span> & <span className='text-primary'>Fashion</span> <br /> for Men <span className='text-primary'>&</span> Women</h1>
                    <p className='tracking-wider my-2 mb-6'>Elevate your style with our premium beauty products and fashion essentials. <br /> Explore our curated collection and unleash your inner fashionista today <br />from all over <span className='text-primary'>Karnataka</span></p>
                    <div className=' my-2'>
                        <Link to="/productspage" className='px-10 py-4 bg-primary text-white me-4 rounded-3xl hover:shadow-lg'>Shop Now</Link>
                    </div>
                </div>
                <img className='h-full hidden md:block' src={beauty} alt="" />
            </div>
        </div>
    );
};

export default Banner;