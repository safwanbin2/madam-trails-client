import React, { useState } from 'react';
// import SecondNavbar from './SecondNavbar/SecondNavbar';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../Components/LoadingPage';
import ProductCard from '../../Components/ProductCard';
import { useLoaderData } from 'react-router-dom';

const ProductPage = () => {
    const searchText = useLoaderData();
    // const [searchText, setSearchText] = useState("");
    const [categoryText, setCategoryText] = useState("");
    // const { register, handleSubmit } = useForm();
    // const handleFormSubmit = data => {
    //     setCategoryText("");
    //     setSearchText(data.search);
    // }
    const { data: products, isLoading } = useQuery({
        queryKey: [searchText, "/products/find", categoryText],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/products/find?q=${searchText ? searchText : ""}&category=${categoryText}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <div className=''>
                <div className='w-11/12 mx-auto py-2 md:py-4 flex flex-col md:flex-row gap-2'>
                    <div className=''>
                        <h2 className='text-xl mb-3 text-grey'>Categories: </h2>
                        <div className='w-full md:w-auto flex gap-2'>
                            <button onClick={() => setCategoryText("")} className={`${categoryText === "" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg border  transition-all duration-300 w-full`}>All</button>
                            <button onClick={() => setCategoryText("men")} className={`${categoryText === "men" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg border  transition-all duration-300 w-full`}>Men</button>
                            <button onClick={() => setCategoryText("women")} className={`${categoryText === "women" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent "} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg border transition-all duration-300 w-full`}>Women</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-11/12 mx-auto my-6'>
                {
                    isLoading ? <LoadingPage />
                        : (products.length === 0 ? <div className='text-xl font-semibold text-grey'>No Products Available</div> : <div className='grid grid-cols-2 md:grid-cols-7 gap-2'>
                            {
                                products.map(product => <ProductCard
                                    key={product._id}
                                    product={product}
                                ></ProductCard>)
                            }
                        </div>)
                }
            </div>
        </div>
    );
};

export default ProductPage;