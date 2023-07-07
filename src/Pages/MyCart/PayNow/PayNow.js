import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const PayNow = () => {
    const { user } = useContext(AuthContext);
    const { data: summary, isLoading, refetch } = useQuery({
        queryKey: ["cart", "mycart", "summary", "email", user],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/cart/mycart/summary?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='w-11/12 mx-auto my-6 flex flex-col-reverse md:grid gap-4 mycart' style={{ gridTemplateColumns: "2fr 1fr" }}>
            <div className=''>
                <h2 className='text-xl text-grey'>Pay Now: </h2>
                {
                    
                }
            </div>
            <div>
                <div className='bg-base-100 shadow p-6 flex flex-col gap-5'>
                    <h2 className='text-xl text-grey'>Order Summary: </h2>
                    {
                        isLoading ? <h2>Loading...</h2>
                            : <>
                                <div className='flex items-center justify-between'>
                                    <h4>Subtotal items</h4>
                                    <h4>{summary?.subTotalItems}</h4>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <h4>Subtotal Price</h4>
                                    <h4>$ {summary?.subTotalPrice}</h4>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <h4>Shipping Fee</h4>
                                    <h4>$ {summary?.shippingFee}</h4>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <h4>Total</h4>
                                    <h4 className='text-2xl text-primary'>$ {summary?.totalPrice}</h4>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default PayNow;