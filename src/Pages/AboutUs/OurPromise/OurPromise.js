import React from 'react';

const OurPromise = () => {
    return (
        <div className='mt-12'>
            <div className='text-center'>
                <h2 className='text-4xl font-bold text-[#333333] tracking-wider mb-1 uppercase'>Our Promise</h2>
                <div className="border-t border-[#bdbbbb] mt-4 mb-12"></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <img className='w-full h-full' src="https://hbr.org/resources/images/article_assets/2019/12/Dec19_31_BusinessDeals.jpg" alt="" />
                <div className='bg-base-100 flex flex-col gap-6 p-6'>
                    <div>
                        <h2 className='text-2xl tracking-wider mb-1'>Variety of Products</h2>
                        <p className='text-sm'>We offer variety of products to our customer at a great value.</p>
                    </div>
                    <div>
                        <h2 className='text-2xl tracking-wider mb-1'>Best Prices</h2>
                        <p className='text-sm'>We offer great value by offering competetive prices on all of our products</p>
                    </div>
                    <div>
                        <h2 className='text-2xl tracking-wider mb-1'>Delivery Range</h2>
                        <p className='text-sm'>Currently we are deliverying within all over <span className='text-primary'>Karnataka</span></p>
                    </div>
                    <div>
                        <h2 className='text-2xl tracking-wider mb-1'>Fast Delivery</h2>
                        <p className='text-sm'>We aim to please our customer with fast delivery and easy tracking system</p>
                    </div>
                    <div>
                        <h2 className='text-2xl tracking-wider mb-1'>100% Protected</h2>
                        <p className='text-sm'>We offer 100% protection for your purchase from click to delivery</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurPromise;