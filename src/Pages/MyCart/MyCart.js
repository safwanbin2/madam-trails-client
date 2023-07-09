import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../Components/LoadingPage';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';

const MyCart = () => {
    const { user, userDB } = useContext(AuthContext);
    const { data: cartItems, isLoading, refetch } = useQuery({
        queryKey: ["cart", "mycart", "email", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cart/mycart?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    
    const { data: summary, isLoading: isSummaryLoading, refetch: refetchSummary } = useQuery({
        queryKey: ["cart", "mycart", "summary", "email", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cart/mycart/summary?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='w-11/12 mx-auto my-6 flex flex-col-reverse md:grid gap-4 mycart' style={{ gridTemplateColumns: "2fr 1fr" }}>
            <div>
                <CustomerDetails />
                <div className=''>
                    <h2 className='text-xl text-grey'>Cart: </h2>
                    {
                        isLoading ? <LoadingPage />
                            : <div>{
                                cartItems.map(cartItem => <CartItem
                                    key={cartItem._id}
                                    cartItem={cartItem}
                                    refetch={refetch}
                                    // setRefetch={setRefetch}
                                    refetchSummary={refetchSummary}
                                />)
                            }</div>
                    }
                </div>
            </div>
            <div>
                <div className='bg-base-100 shadow p-6 flex flex-col gap-5'>
                    <h2 className='text-xl text-grey'>Order Summary: </h2>
                    {
                        isSummaryLoading ? <h2>Loading...</h2>
                            : <>
                                <div className='flex items-center justify-between'>
                                    <h4>Subtotal items</h4>
                                    <h4>{summary?.subTotalItems}</h4>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <h4>Subtotal Price</h4>
                                    <h4>₹ {summary?.subTotalPrice}</h4>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <h4>Shipping Fee</h4>
                                    <h4>₹ {summary?.shippingFee}</h4>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <h4>Total</h4>
                                    <h4 className='text-2xl text-primary'>₹ {summary?.totalPrice}</h4>
                                </div>
                                {
                                    (!userDB?.phone || !userDB?.location) ?
                                        <>
                                            <button disabled className='px-4 md:px-10 py-2 text-base-300 border rounded-3xl hover:shadow-lg flex justify-center items-center'>
                                                <p>Proceed to Checkout</p>
                                            </button>
                                            <p className='text-error text-sm'>*Edit phone & location</p>
                                        </>
                                        : <Link to="/mycart/paynow"
                                            className='px-4 md:px-10 py-2 bg-primary text-white rounded-3xl hover:shadow-lg flex justify-center items-center'>
                                            <p>Proceed to Checkout</p>
                                        </Link>
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyCart;