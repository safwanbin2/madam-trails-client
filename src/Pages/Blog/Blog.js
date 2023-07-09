import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingPage from '../../Components/LoadingPage';
import BlogPostCard from '../../Components/Blogs/BlogPostCard';

const Blog = () => {
  const [categoryText, setCategoryText] = useState("health")
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blogs", "category", categoryText],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/blogs?category=${categoryText}`);
      const data = await res.json();
      return data;
    }
  });
  if (isLoading) {
    return <LoadingPage />
  }
  return (
    <div className='w-11/12 mx-auto'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-xl my-6 text-grey'>Blogs: </h2>
        <div className="form-control flex-row">
          <label className="label ps-0 pe-2">
            <span className="">Category: </span>
          </label>
          <select onChange={(e)=> setCategoryText(e.target.value) } className="shadow bg-white focus:outline-none rounded p-2  w-full">
            <option value="health">Health</option>
            <option value="fashion">Fashion</option>
            <option value="lifestyle">Life Style</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
        {
          posts.map(post => <BlogPostCard
            key={post._id}
            post={post}
          />)
        }
      </div>
    </div>
  );
};

export default Blog;