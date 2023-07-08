import React from 'react';
import { useLoaderData } from 'react-router-dom';

const MyOrder = () => {
    const order = useLoaderData();
    console.log(order);
    return (
        <div className='w-11/12 mx-auto my-6'>
            <h2>ID: {order._id}</h2>
        </div>
    );
};

export default MyOrder;