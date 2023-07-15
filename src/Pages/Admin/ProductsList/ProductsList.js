import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingPage from '../../../Components/LoadingPage';
import ProductListItem from './ProductListItem';

const ProductsList = () => {
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ["products", "all"],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/products/all`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className='text-xl mb-3 text-grey'>Products: </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    products.map(product => <ProductListItem
                        key={product._id}
                        product={product}
                        refetch={refetch}
                    />)
                }
            </div>
        </div>
    );
};

export default ProductsList;