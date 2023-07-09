import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const CartItem = ({ cartItem, refetch, refetchSummary }) => {
    // console.log(cartItem);
    const { productTitle, productSubTitle, addingDate, productPrice, quantity, productImage, productId, _id } = cartItem;

    const { countRefetch, setCountRefetch } = useContext(AuthContext);
    const handleRemoveFromCart = id => {
        const consent = window.confirm("Are you sure you want to remove item from Cart?");
        if (consent) {
            fetch(`http://localhost:5000/cart/delete?id=${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        toast.success("Successfully deleted");
                        setCountRefetch(!countRefetch);
                        refetch();
                        refetchSummary();
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Error");
                })
        }
    }

    return (
        <div className='grid grid-cols-4 my-4 items-center gap-4 text-grey shadow'>
            <img className='w-[80px] h-[100px]' src={productImage} alt="" />
            <div className='flex justify-center  flex-col'>
                <h3 className='text-xs md:text-base'>{productTitle} <span className='hidden md:block'>- {productSubTitle}</span></h3>
                <h3 className='text-xs text-base-300'>{addingDate.slice(0, 10)}</h3>
            </div>
            <div className='flex justify-center items-center'>
                <h3>₹ {productPrice} x {quantity}</h3>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-center items-center'>
                    <Link className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300' to={`/product/${productId}`}><AiOutlineArrowRight /></Link>
                </div>
                <div className='flex justify-center items-center'>
                    <button onClick={() => handleRemoveFromCart(_id)} className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300'><RiDeleteBin7Line /></button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;