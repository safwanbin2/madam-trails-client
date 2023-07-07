import React from 'react';

const SecondNavbar = () => {
    return (
        <div className='bg-[#ecebeb]'>
            <div className='w-11/12 mx-auto py-4 flex'>
                <button className='px-10 py-1 bg-primary text-white me-4 rounded-3xl hover:shadow-lg'>Men</button>
                <button className='px-10 py-1 bg-primary text-white me-4 rounded-3xl hover:shadow-lg'>Women</button>
                <div className='flex w-full'>
                    <input className='me-4 outline-none bg-white rounded-full px-3 py-1 w-full' placeholder='Search for product' type="search" name="" id="" />
                    <button className='px-10 py-1 bg-primary text-white me-4 rounded-3xl hover:shadow-lg' type='search'>Search</button>
                </div>
            </div>
        </div>
    );
};

export default SecondNavbar;