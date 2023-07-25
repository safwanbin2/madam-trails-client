import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingPage from '../../../Components/LoadingPage';
import BlogPostAdminCard from './BlogPostAdminCard';

const BlogPosts = () => {
    const { data: posts, isLoading, refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/blogs/all`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className='text-xl my-6 text-grey'>Blogs: </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {
                    posts.map(post => <BlogPostAdminCard
                        key={post._id}
                        post={post}
                        refetch={refetch}
                    />)
                }
            </div>
        </div>
    );
};

export default BlogPosts;