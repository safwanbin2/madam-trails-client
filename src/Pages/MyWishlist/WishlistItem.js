import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const WishlistItem = ({ item, refetch }) => {
    const { productTitle, productSubTitle, productCategory, productImage, productPrice, productId, buyerEmail, _id } = item;
    const { countRefetch, setCountRefetch } = useContext(AuthContext);

    const handleRemoveFromWishlist = id => {
        const consent = window.confirm("Are you sure you want to remove item from wishlist?");
        if (consent) {
            fetch(`https://working-title-server.vercel.app/wishlist/delete?id=${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        toast.success("Successfully deleted");
                        setCountRefetch(!countRefetch);
                        refetch();
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Error");
                })
        }
    }
    return (
        <div className='grid grid-cols-4 my-4 items-center gap-4 text-grey shadow-sm'>
            <img className='w-[80px] md:w-[120px] h-[100px]  md:h-[140px]' src={productImage} alt="" />
            <div className='flex justify-center items-center text-xs md:text-base'>
                <h3 className='text-xs md:text-base'>{productTitle} <span className='hidden md:block'>- {productSubTitle}</span></h3>
            </div>
            <div className='flex justify-center items-center'>
                <h3>₹ {productPrice}</h3>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-center items-center'>
                    <Link className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300' to={`/product/${productId}`}><AiOutlineArrowRight /></Link>
                </div>
                <div className='flex justify-center items-center'>
                    <button onClick={() => handleRemoveFromWishlist(_id)} className='text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300'><RiDeleteBin7Line /></button>
                </div>
            </div>
        </div>
    );
};

export default WishlistItem;