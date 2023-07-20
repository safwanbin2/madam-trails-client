import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingPage from '../../Components/LoadingPage';
import ProductCard from '../../Components/ProductCard';

const CategoryProductsWomen = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["category", "women"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/categories?category=women`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingPage/>
    }
console.log(products);
    return (
        <div className='mb-6'>
            <h2 className='text-xl mb-3 text-grey'>Women: </h2>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    ></ProductCard>)
                }
            </div>
        </div>
    );
};

export default CategoryProductsWomen;