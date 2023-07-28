import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingPage from '../../../Components/LoadingPage';
import CategoryProductCard from '../../../Components/CategoryProductCard';

const CategoriesHome = ({ title, category }) => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["/products/categories", "category", category],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/categories?category=${category}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='my-12'>
            <div className='flex flex-col justify-center items-center mb-6'>
                <h2 className='text-xl mb-1'>{title}</h2>
                <div className=' w-24 h-[2px] bg-black '></div>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-10 gap-2 py-4 bg-gradient-to-tr from-accent to-info'>
                {
                    products.map((product, i) => <CategoryProductCard
                        key={i}
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default CategoriesHome;