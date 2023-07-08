import React from 'react';

const OrderedProduct = ({ product }) => {
    const { productImage, productPrice, productTitle, productSubTitle, quantity, reference } = product;
    console.log(product);
    return (
        <>
            <div className='hidden md:grid grid-cols-5 my-4 items-center gap-4 text-grey shadow'>
                <img className='w-[80px] md:w-[120px] h-[100px]  md:h-[140px]' src={productImage} alt="" />
                <div className='flex justify-center items-center '>
                    <h3 className=''>{productTitle} <span className='hidden md:block text-sm'>- {productSubTitle}</span></h3>
                </div>
                <div className='flex justify-center items-center'>
                    <h3 className='text-sm'>Note - {reference}</h3>
                </div>
                <div className='flex justify-center items-center'>
                    <h3>qty - {quantity}</h3>
                </div>
                <div className='flex justify-center items-center'>
                    <h3>₹ {productPrice}</h3>
                </div>
            </div>
            <div className='my-4 md:hidden shadow'>
                <img className='w-full' src={productImage} alt="" />
                <div className='p-4'>
                    <h3 className=''>{productTitle} <span className=''>- {productSubTitle}</span></h3>
                    <h3 className=''>note - {reference}</h3>
                    <h3>qty - {quantity}</h3>
                    <h3>₹ {productPrice}</h3>
                </div>
            </div>
        </>
    );
};

export default OrderedProduct;