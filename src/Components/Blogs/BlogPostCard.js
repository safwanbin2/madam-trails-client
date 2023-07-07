import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
    const { title, body, image, date, _id } = post;
    return (
        <Link to={`/blog/${_id}`}>
            <img className='w-full h-[130px] md:h-[220px]' src={image} alt="" />
            <div className='p-2'>
                <h1 className='text-base md:text-xl'>{title}</h1>
                <h4 className='text-xs text-gray-500'>{date}</h4>
                <p className='hidden md:block'>{body.length > 100 ? `${body.slice(0, 100)}...` : body}</p>
            </div>
        </Link>
    );
};

export default BlogPostCard;