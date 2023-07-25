import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingPage from '../../../Components/LoadingPage';

const AddBlogPost = () => {
    const [addBlogLoading, setAddBlogLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const d = new Date();
    const navigate = useNavigate();
    const url = "https://api.imgbb.com/1/upload?key=ee207df4d4ece17d8fc4767557525c84";

    const handleAddPost = data => {
        setAddBlogLoading(true);
        const image = data.image[0];
        const formdata = new FormData();
        formdata.append("image", image);

        fetch(url, {
            method: "POST",
            body: formdata
        })
            .then(res => res.json())
            .then(imgData => {
                const newPost = {
                    title: data.title,
                    category: data.category,
                    image: imgData.data.url,
                    body: data.description,
                    date: d,
                    blogger: user?.email
                }
                // posting to blogs collection
                fetch(`https://working-title-server.vercel.app/blogs/add`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(newPost)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            setAddBlogLoading(false);
                            toast.success("Posted Blog successfully");
                            navigate("/blog")
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        toast.error("error occured");
                    })
            })
            .catch(err => {
                console.error(err);
                toast.error("error occured");
            });
    }

    if (addBlogLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className='text-xl my-6 text-grey'>Add Post: </h2>
            <form onSubmit={handleSubmit(handleAddPost)}>
                <div className=''>
                    <div className="form-control">
                        <label className="label ps-0">
                            <span className="">Title</span>
                        </label>
                        <input {
                            ...register("title", {
                                required: "Provide a title"
                            })
                        } type="text" placeholder="title" className="shadow bg-white focus:outline-none rounded p-2  w-full" />
                        {errors.title && <label className="label text-red-400 text-xs ps-0">
                            <span className="">{errors.title.message}</span>
                        </label>}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label ps-0">
                        <span className="">Description</span>
                    </label>
                    <textarea {...register("description", {
                        required: "Provide a broad description"
                    })} rows="3" className="shadow bg-white focus:outline-none rounded p-2  w-full" placeholder='Description'></textarea>
                    {errors.description && <label className="label text-red-400 text-xs ps-0">
                        <span className="">{errors.description.message}</span>
                    </label>}
                </div>
                <div className=' mb-4'>
                    <div className="form-control">
                        <label className="label ps-0">
                            <span className="">Category</span>
                        </label>
                        <select {
                            ...register("category", {
                                required: "Select a category"
                            })
                        } className="shadow  bg-white focus:outline-none rounded p-2  w-full">
                            <option value="health">Health</option>
                            <option value="fashion">Fashion</option>
                            <option value="lifestyle">Life Style</option>
                        </select>
                        {errors.category && <label className="label text-red-400 text-xs ps-0">
                            <span className="">{errors.category.message}</span>
                        </label>}
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mb-6">
                    <label htmlFor="dropzone-file" className={`${errors.image ? "border-red-600" : "border-gray-300"} flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100 `}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input {...register('image', {
                            required: "Must upload an image"
                        })} id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                <div className='flex justify-center items-center'>
                    <button className='px-10 py-2 bg-primary text-white me-4 rounded-3xl hover:shadow-lg' type='submit'>Post Blog</button>
                </div>
            </form>
        </div>
    );
};

export default AddBlogPost;