import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const PayNow = () => {
    const [isCOD, setIsCOD] = useState(false);
    const { user } = useContext(AuthContext);
    const { data: summary, isLoading, refetch } = useQuery({
        queryKey: ["cart", "mycart", "summary", "email", user],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cart/mycart/summary?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    const handlePlaceOrderCOD = () => {
        if (!isCOD) {
            return toast.success("Select a payment option");
        }
        
    }

    return (
        <div className='w-11/12 mx-auto my-6 flex flex-col-reverse md:grid gap-4 mycart' style={{ gridTemplateColumns: "2fr 1fr" }}>
            <div className=''>
                <h2 className='text-xl text-grey'>Pay Now: </h2>
                {
                    <div className='grid grid-cols-2 h-[150px] gap-4'>
                        <button className='w-full hover:bg-primary hover:text-white text-black bg-base-200 h-full'>
                            <p className=' text-xl '>Paytm</p>
                        </button>
                        <button
                            onClick={() => setIsCOD(!isCOD)}
                            className={`w-full hover:bg-primary hover:text-white h-full ${isCOD ? "text-white bg-primary" : "bg-base-200  text-black"}`}>
                            <p className=' text-xl '>COD</p>
                        </button>
                    </div>
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
                                <button
                                    onClick={() => handlePlaceOrderCOD()}
                                    disabled={isCOD ? false : true}
                                    className={`${isCOD ? "bg-primary" : "bg-base-200"} px-4 md:px-10 py-2 text-white rounded-3xl hover:shadow-lg flex justify-center items-center`}>
                                    <p>Place Order</p>
                                </button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default PayNow;