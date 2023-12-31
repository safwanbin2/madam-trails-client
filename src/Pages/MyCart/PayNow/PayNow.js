import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import paytmImage from '../../../Assets/icons/paytm.png';
import codImage from '../../../Assets/icons/cod.png';

const PayNow = () => {
    const { user, userDB } = useContext(AuthContext);
    const [isCOD, setIsCOD] = useState(false);
    const d = new Date();
    const navigate = useNavigate();

    const { data: summary, isLoading } = useQuery({
        queryKey: ["cart", "mycart", "summary", "email", user],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/cart/mycart/summary?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    console.log(summary);
    const handlePlaceOrderCOD = () => {
        if (!isCOD) {
            return toast.success("Select a payment option");
        }

        if (!summary.subTotalItems) {
            return toast.error("Can not proceed with empty Cart");
        }

        const newOrder = {
            products: [],
            paymentMethod: "cod",
            summary,
            status: "pending",
            createdAt: d,
            tracking: [],
            buyerEmail: userDB?.email,
            buyerPhone: userDB?.phone,
            buyerId: userDB?._id,
            buyerName: `${userDB?.firstName} ${userDB?.lastName}`,
            buyerLocation: userDB?.location
        }

        fetch(`https://working-title-server.vercel.app/orders/placeorder?email=${user?.email}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged || data.insertedId) {
                    navigate("/myorders")
                    window.location.reload();
                    return toast.success("Order Placed");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Error occured");
            })
    }

    return (
        <div className='w-11/12 mx-auto my-6 flex flex-col-reverse md:grid gap-4 mycart' style={{ gridTemplateColumns: "2fr 1fr" }}>
            <div className=''>
                <h2 className='text-xl text-grey mb-4'>Pay Now: </h2>
                {
                    <div className='grid grid-cols-2 h-[150px] gap-4'>
                        <button className='border border-black hover:border-transparent transition-all duration-300 flex justify-center items-center w-full hover:bg-primary hover:text-white text-black bg-base-200 h-full'>
                            <img className='w-[50%]' src={paytmImage} alt="" />
                        </button>
                        <button
                            onClick={() => setIsCOD(!isCOD)}
                            className={`border border-black hover:border-transparent transition-all duration-300 flex justify-center items-center w-full hover:bg-primary hover:text-white h-full ${isCOD ? "text-white bg-primary" : "bg-base-200  text-black"}`}>
                            <img className='w-[50%]' src={codImage} alt="" />
                        </button>
                    </div>
                }
            </div>
            <div>
                <div className='bg-info shadow p-6 flex flex-col gap-5'>
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