import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import LoadingPage from '../../Components/LoadingPage';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: orders, isLoading } = useQuery({
        queryKey: [user?.email, "orders", "myorders", "email"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders/myorders?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='w-11/12 mx-auto my-6'>
            <h2 className='text-xl text-grey'>My Orders: </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-6'>
                {
                    orders.map(order => <div
                        key={order._id}
                        className='p-6 shadow'
                    >
                        <h2>Reciepent: {order.buyerName}</h2>
                        <h2>Delivery Status: {order.status}</h2>
                        <h2 className='text-sm'>Placed at: {order.createdAt.slice(0, 10)}</h2>
                        <div>
                            <span>View: </span>
                            <Link to={`/myorders/${order._id}`} className='text-blue-500'>{order._id}</Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyOrders;