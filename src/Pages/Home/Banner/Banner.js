import React from 'react';
import "./Banner.css";
import { Link } from 'react-router-dom';
import cosmetics from '../../../Assets/Banner/cosmetics.png';
import rush from '../../../Assets/Banner/rush.png';

const Banner = () => {
    return (
        <div className=' overflow-hidden flex flex-col justify-center bg-[#BAFFB4]'>
            <div className='banner w-11/12 mx-auto flex items-center'>
                <div className='w-full md:w-6/12'>
                    <h1 style={{fontFamily: "'Lumanosimo', cursive"}} className='text-2xl md:text-4xl text-grey uppercase tracking-widest leading-10 font-semibold'>Discover <br /><span className='text-primary'>Beauty</span> & <span className='text-primary'>Fashion</span> <br /> for Men <span className='text-primary'>&</span> Women</h1>
                    <p className='tracking-wider my-2 mb-6 text-base md:text-lg'>Elevate your style with our premium beauty products and fashion essentials. <br /> Explore curated collection and unleash inner fashionista today <br />from all over <span className=''>Karnataka</span></p>
                    <div className=' my-2'>
                        <Link to="/productspage" className='px-10 py-4 bg-primary text-white me-4 rounded-3xl hover:shadow-lg'>Shop Now</Link>
                    </div>
                </div>
                <div className='justify-end hidden md:flex w-full md:w-6/12'>
                    <img className='h-full ' src={rush} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;