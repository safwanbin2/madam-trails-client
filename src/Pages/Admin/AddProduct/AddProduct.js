import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../../Components/LoadingPage';

const AddProduct = () => {
    const [addProductLoading, setAddProductLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const d = new Date();
    const url = "https://api.imgbb.com/1/upload?key=ee207df4d4ece17d8fc4767557525c84";
    
    const handleAddProduct = data => {
        setAddProductLoading(true);
        const image = data.image[0];
        const formdata = new FormData();
        formdata.append("image", image);

        fetch(url, {
            method: "POST",
            body: formdata
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                const newProduct = {
                    title: data.title,
                    subTitle: data.subTitle,
                    description: data.description,
                    image: imgData.data.url,
                    category: data.category,
                    subCategory: data.subCategory,
                    date: d,
                    brand: data.brand,
                    price: parseFloat(data.price),
                    isBoosted: false
                }
                // posting the new movie to the db
                fetch(`https://working-title-server.vercel.app/products/add`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(newProduct)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setAddProductLoading(false)
                        if (data.acknowledged) {
                            toast.success("Successfully added Product");
                            navigate("/admin/products/all");
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        toast.error("Failed")
                    })
            })
            .catch(err => {
                console.error(err);
            })
    }

    if (addProductLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className='text-xl my-6 text-grey'>Add Product: </h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
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
                    <div className="form-control">
                        <label className="label ps-0">
                            <span className="">Sub Title</span>
                        </label>
                        <input {
                            ...register("subTitle", {
                                required: "Provide a Subtitle"
                            })
                        } type='text' placeholder="provide size, colors, etc" className="shadow bg-white focus:outline-none rounded p-2   w-full" />
                        {errors.subTitle && <label className="label text-red-400 text-xs ps-0">
                            <span className="">{errors.subTitle.message}</span>
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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className="form-control">
                        <label className="label ps-0">
                            <span className="">Brand</span>
                        </label>
                        <input {
                            ...register("brand", {
                                required: "Provide a brand name"
                            })
                        } type="text" placeholder="brand" className="shadow bg-white focus:outline-none rounded p-2  w-full" />
                        {errors.brand && <label className="label text-red-400 text-xs ps-0">
                            <span className="">{errors.brand.message}</span>
                        </label>}
                    </div>
                    <div className="form-control">
                        <label className="label ps-0">
                            <span className="">Price in ₹ </span>
                        </label>
                        <input {
                            ...register("price", {
                                required: "Provide a Price"
                            })
                        } type='number' placeholder="price in dollar" className="shadow bg-white focus:outline-none rounded p-2   w-full" />
                        {errors.price && <label className="label text-red-400 text-xs ps-0">
                            <span className="">{errors.price.message}</span>
                        </label>}
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-4'>
                    <div className="form-control">
                        <label className="label ps-0">
                            <span className="">Category</span>
                        </label>
                        <select {
                            ...register("category", {
                                required: "Select a category"
                            })
                        } className="shadow  bg-white focus:outline-none rounded p-2  w-full">
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                        </select>
                        {errors.category && <label className="label text-red-400 text-xs ps-0">
                            <span className="">{errors.category.message}</span>
                        </label>}
                    </div>
                    <div className="form-control">
                        <label className="label ps-0">
                            <span className="">Sub Category</span>
                        </label>
                        <select {
                            ...register("subCategory", {
                                required: "Select a Sub category"
                            })
                        } className="shadow  bg-white focus:outline-none rounded p-2  w-full">
                            <option value="fashion">Fashion</option>
                            <option value="makeup">Make Up</option>
                            <option value="skincare">Skin Care</option>
                            <option value="haircare">Hair Care</option>
                        </select>
                        {errors.subCategory && <label className="label text-red-400 text-xs ps-0">
                            <span className="">{errors.subCategory.message}</span>
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
                    <button className='px-10 py-2 bg-primary text-white me-4 rounded-3xl hover:shadow-lg' type='submit'>Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;