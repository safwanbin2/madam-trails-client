import React from 'react';
import "./Banner.css";
import { Link } from 'react-router-dom';
import cosmetics from '../../../Assets/Banner/cosmetics.png';
import clothe from '../../../Assets/Banner/clothe.png';

const Banner = () => {
    return (
        <div className='flex flex-col justify-center '>
            <div className='banner w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center'>
                <div className=''>
                    <h1 className='text-2xl md:text-4xl text-grey uppercase tracking-wider leading-10'>Discover <br /><span className=''>Beauty</span> & <span className=''>Fashion</span> <br /> for Men <span className=''>&</span> Women</h1>
                    <p className='tracking-wider my-2 mb-6 text-base md:text-lg'>Elevate your style with our premium beauty products and fashion essentials. <br /> Explore curated collection and unleash inner fashionista today <br />from all over <span className=''>Karnataka</span></p>
                    <div className=' my-2'>
                        <Link to="/productspage" className='px-10 py-4 bg-primary text-white me-4 rounded-3xl hover:shadow-lg'>Shop Now</Link>
                    </div>
                </div>
                <img className='h-full hidden md:block' src={cosmetics} alt="" />
            </div>
        </div>
    );
};

export default Banner;