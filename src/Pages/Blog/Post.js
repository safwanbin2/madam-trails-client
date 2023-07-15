import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Post = () => {
    const post = useLoaderData();
    const { title, image, body, date, category } = post;

    const { data: categoryPosts, isLoading } = useQuery({
        queryKey: [category, "category", "blogs"],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/blogs?category=${category}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <img className='h-auto md:h-[80vh] w-full' src={image} alt="" />
            <div className='w-11/12 my-6 mx-auto flex flex-col md:grid gap-6' style={{ gridTemplateColumns: "3fr 1fr" }}>
                <div className=''>
                    <h1 className='text-2xl font-semibold tracking-widest'>{title}</h1>
                    <h4 className='text-xs text-gray-500'>{date.slice(0, 10)}</h4>
                    <p className='mt-6'>{body}</p>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-xl tracking-wider'>Similiar Posts: </h2>
                    {
                        isLoading ? <h2>Loading...</h2>
                            : categoryPosts.map(categoryPost => <Link
                                key={categoryPost._id}
                                className='shadow p-4 grid gap-2' 
                                style={{gridTemplateColumns: "1fr 2fr"}}
                                to={`/blog/${categoryPost._id}`}
                            >
                                <img className='' src={categoryPost.image} alt="" />
                                <div>
                                    <h1>{categoryPost.title}</h1>
                                    <h4 className='text-xs text-500'>{categoryPost.date}</h4>
                                </div>
                            </Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Post;