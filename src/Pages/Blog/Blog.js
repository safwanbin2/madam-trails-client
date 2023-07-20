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

  return (
    <div className='w-11/12 mx-auto'>
      <div className='my-6 gap-2 flex flex-col md:flex-row md:justify-between md:items-center'>
        <h2 className='text-xl text-grey'>Blogs: {categoryText}</h2>
        {/* <div className="form-control flex-row">
          <label className="label ps-0 pe-2">
            <span className="">Category: </span>
          </label>
          <select onChange={(e)=> setCategoryText(e.target.value) } className="shadow bg-white focus:outline-none rounded p-2  w-full">
            <option value="health">Health</option>
            <option value="fashion">Fashion</option>
            <option value="lifestyle">Life Style</option>
          </select>
        </div> */}
        <div className='w-full md:w-auto flex gap-2'>
          <button onClick={() => setCategoryText("health")} className={`${categoryText === "health" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg border transition-all duration-300`}>Health</button>
          <button onClick={() => setCategoryText("fashion")} className={`${categoryText === "fashion" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg  border  transition-all duration-300`}>Fashion</button>
          <button onClick={() => setCategoryText("lifestyle")} className={`${categoryText === "lifestyle" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg  border  transition-all duration-300`}>Life Style</button>
        </div>
      </div>
      {
        isLoading ? <LoadingPage />
          : <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
            {
              posts.map(post => <BlogPostCard
                key={post._id}
                post={post}
              />)
            }
          </div>
      }
    </div>
  );
};

export default Blog;