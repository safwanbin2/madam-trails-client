import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import LoadingPage from '../../../Components/LoadingPage';
import { Link } from 'react-router-dom';

const RecievedOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: orders, isLoading } = useQuery({
        queryKey: [user?.email, "orders", "myorders", "delivered", "email"],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/orders/myorders/delivered?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='my-6'>
            <h2 className='text-xl tracking-wider mb-2'>Recieved Orders: </h2>
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 my-6'>
                {
                    orders.map(order => <div
                        key={order._id}
                        className='p-6 shadow tracking-wider bg-base-100'
                    >
                        <h2 className='text-xl my-1'>
                            {
                                order.products.map((product, i) => <span key={i}>{product.productTitle},  </span>)
                            }
                        </h2>
                        <h2 className='text-sm'>Delivery Status: <span className='text-green-500 text-lg'>{order.status}</span></h2>
                        <h2 className='text-sm'>Total Price: <span className='text-green-500 text-lg'>₹ {order.summary.totalPrice}</span></h2>
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

export default RecievedOrders;