import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // console.log(product);
    const { _id, title, subTitle, image, description, price, category, subCategory } = product;
    return (
        <Link className='shadow hover:shadow-md transition-all duration-300' to={`/product/${_id}`}>
            <img className='w-full h-48' src={image} alt="" />
            <div className='p-3 min-h-[124px] overflow-hidden'>
                <h3 className='text-primary tracking-wider'>{title}</h3>
                <h2 className='text-grey text-sm my-1'>{subTitle.length > 40 ? `${subTitle.slice(0, 40)}...` : subTitle}</h2>
                <h3 className='text-primary tracking-wider font-semibold'>${price}</h3>
            </div>
        </Link>
    );
};

export default ProductCard;