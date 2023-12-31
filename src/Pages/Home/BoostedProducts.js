import { useQuery } from '@tanstack/react-query';
import React, { } from 'react';
import LoadingPage from '../../Components/LoadingPage';
import ProductCard from '../../Components/ProductCard';

const BoostedProducts = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["limit", "boosted", "products"],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/products/boosted?limit=7`);
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) {
        return <LoadingPage />
    }
    return (
        <div className='mb-6'>
            <h2 className='text-xl mb-3 text-grey'>Hot Sales: </h2>
            <div className='grid grid-cols-2 md:grid-cols-7 gap-2'>
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

export default BoostedProducts;