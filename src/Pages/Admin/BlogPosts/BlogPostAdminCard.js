import React from 'react';
import { toast } from 'react-hot-toast';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const BlogPostAdminCard = ({ post, refetch }) => {
    const { image, title, date, _id, category } = post;

    const handleDeletePost = id => {
        const consent = window.confirm("are you sure you want to delete the blog");
        if (consent) {
            fetch(`http://localhost:5000/blogs/delete?id=${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        toast.success("Post Deleted");
                        refetch();
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Error deleting blog");
                })
        }
    }

    return (
        <div className='shadow p-4 grid gap-2' style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
            <Link to={`/blog/${_id}`}>
                <img className='h-full' src={image} alt="" />
            </Link>
            <div>
                <h1>{title}</h1>
                <h4 className='text-xs text-gray-500'>{category} - {date.slice(0, 10)}</h4>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={() => handleDeletePost(_id)} className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300'><RiDeleteBin7Line /></button>
            </div>
        </div>
    );
};

export default BlogPostAdminCard;