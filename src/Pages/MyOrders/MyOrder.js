import React from 'react';
import { useLoaderData } from 'react-router-dom';
import OrderedProduct from './OrderedProduct';

const MyOrder = () => {
    const order = useLoaderData();
    const { products } = order;
    return (
        <div className='w-11/12 mx-auto my-6'>
            <div className='tracking-wider'>
                <h2 className=' my-1 text-sm md:text-base'>Reciepent: {order.buyerName}</h2>
                <h2 className=' my-1 text-sm md:text-base'>Contact: {order.buyerEmail}, {order.buyerPhone}</h2>
                <h2 className=' my-1 text-sm md:text-base'>Location: {order.buyerLocation}</h2>
                <h2 className=' my-1 text-sm md:text-base'>Delivery Status: <span className='text-green-500'>{order.status}</span></h2>
                <h2 className='text-sm my-1'>Placed at: {order.createdAt.slice(0, 10)}</h2>
                <h2 className='my-1 text-sm md:text-base'>ID: {order._id}</h2>
            </div>
            <h2 className='text-xl tracking-wider my-6'>Products: </h2>
            <div className=''>
                {
                    products.map(product => <OrderedProduct
                        key={product._id}
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default MyOrder;