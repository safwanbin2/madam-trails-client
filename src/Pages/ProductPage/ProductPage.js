import React, { useState } from 'react';
// import SecondNavbar from './SecondNavbar/SecondNavbar';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../Components/LoadingPage';
import ProductCard from '../../Components/ProductCard';

const ProductPage = () => {

    const [searchText, setSearchText] = useState("");
    const [categoryText, setCategoryText] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleFormSubmit = data => {
        setCategoryText("");
        setSearchText(data.search);
    }

    const { data: products, isLoading } = useQuery({
        queryKey: [searchText, "/products/find", categoryText],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/products/find?q=${searchText}&category=${categoryText}`);
            const data = await res.json();
            return data;
        }
    })

    console.log(products);
    return (
        <div>
            <div className='bg-[#ecebeb]'>
                <div className='w-11/12 mx-auto py-2 md:py-4 flex flex-col md:flex-row gap-2 md:gap-0'>
                    <div className='w-full md:w-auto flex'>
                        <button onClick={() => setCategoryText("men")} className='px-10 py-1 bg-primary text-white me-1 md:me-4 rounded-3xl hover:shadow-lg focus:bg-white focus:text-primary w-full md:w-auto'>Men</button>
                        <button onClick={() => setCategoryText("women")} className='px-10 py-1 bg-primary text-white ms-1 md:ms-0 md:me-4 rounded-3xl hover:shadow-lg focus:bg-white focus:text-primary w-full md:w-auto'>Women</button>
                    </div>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex w-full'>
                        <input {
                            ...register('search', {
                                required: "Search text is required"
                            })
                        } className='me-1 md:me-4 outline-none bg-white rounded-full px-3 py-1 w-full' placeholder='Search for product' />
                        <button className='px-10 py-1 bg-primary text-white ms-1 md:ms-0 md:me-4 rounded-3xl hover:shadow-lg' type='submit'>Search</button>
                    </form>
                </div>
            </div>
            <div className='w-11/12 mx-auto my-6'>
                {
                    isLoading ? <LoadingPage />
                        : (products.length === 0 ? <div className='text-xl font-semibold text-grey'>No Products Available</div> : <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
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