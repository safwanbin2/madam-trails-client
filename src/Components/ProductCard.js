import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // console.log(product);
    const { _id, title, subTitle, image, description, price, category, subCategory } = product;
    return (
        <Link className='hover:shadow-md transition-all duration-300  hover:bg-info ' to={`/product/${_id}`}>
            <img className='w-full h-[200px]' src={image} alt="" />
            <div className='p-2 overflow-hidden'>
                <h2 className='font-medium text-base md:text-lg'>{title}</h2>
                <h3 className='font-light text-xs'>{subTitle.length > 40 ? `${subTitle.slice(0, 40)}...` : subTitle}</h3>
                <p className='font-medium text-base md:text-lg'>₹ {price}</p>
            </div>
        </Link>
    );
};

export default ProductCard;