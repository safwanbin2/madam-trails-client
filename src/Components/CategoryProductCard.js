import React from 'react';
import { Link } from 'react-router-dom';

const CategoryProductCard = ({ product }) => {
    const { _id, title, subTitle, image, description, price, category, subCategory } = product;
    return (
        <Link className='shadow hover:shadow-xl transition-all duration-300 ' to={`/product/${_id}`}>
            <img className='w-full h-24' src={image} alt="" />
            <div className='p-2 overflow-hidden text-center bg-primary text-white'>
                <h3 className='tracking-wider text-base'>{title}</h3>
                {/* <h2 className='text-grey text-xs my-1'>{subTitle.length > 40 ? `${subTitle.slice(0, 40)}...` : subTitle}</h2> */}
                <h3 className=' tracking-wider font-semibold'>₹ {price}</h3>
            </div>
        </Link>
    );
};

export default CategoryProductCard;