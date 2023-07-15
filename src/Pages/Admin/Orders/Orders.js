import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingPage from '../../../Components/LoadingPage';
import OrderItem from './OrderItem';

const Orders = () => {
    const [orderStatus, setOrderStatus] = useState("pending");

    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: [orderStatus, "orders", "all", "orderstatus"],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/orders/all?orderstatus=${orderStatus}`);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h2 className='text-xl mt-6 mb-2 text-grey'>Orders: <span className=''>{orderStatus}</span></h2>
            <div className='grid grid-cols-2 gap-1 md:block'>
                <button className={`${orderStatus === "pending" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg md:me-2 border  transition-all duration-300`} onClick={() => setOrderStatus("pending")}>
                    <p>Pending</p>
                </button>
                <button className={`${orderStatus === "picked" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg md:me-2 border  transition-all duration-300`} onClick={() => setOrderStatus("picked")}>
                    <p>Picked</p>
                </button>
                <button className={`${orderStatus === "ondelivery" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg md:me-2 border  transition-all duration-300`} onClick={() => setOrderStatus("ondelivery")}>
                    <p>On Delivery</p>
                </button>
                <button className={`${orderStatus === "delivered" ? "text-primary bg-white border-primary" : "bg-primary text-white border-transparent"} px-4 md:px-10 py-1 text-sm md:text-base rounded-3xl hover:shadow-lg md:me-2 border  transition-all duration-300`} onClick={() => setOrderStatus("delivered")}>
                    <p>Delivered</p>
                </button>
            </div>
            <div className='grid grid-cols-1 gap-4 my-4'>
                {
                    isLoading ? <LoadingPage />
                        : orders.map(order => <OrderItem
                            key={order._id}
                            order={order}
                            refetch={refetch}
                        />)
                }
            </div>
        </div>
    );
};

export default Orders;