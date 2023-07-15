import React from 'react';
import { toast } from 'react-hot-toast';
import { BiSolidHot } from 'react-icons/bi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product, refetch }) => {

    const { title, price, image, category, subCategory, isBoosted, date, _id } = product;

    const handleDelete = id => {
        const consent = window.confirm("Deleting the product will autometically delete cart and wishlist items from users, you may lose Track of data");
        if (consent) {
            fetch(`https://working-title-server.vercel.app/products/delete/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        toast.success("Deleted Successfully");
                        refetch();
                    }
                })
                .catch(err => {
                    toast.error("error occured");
                    console.log(err);
                })
        }
    }

    const handleBoosted = (id, bool) => {
        console.log(bool);
        fetch(`https://working-title-server.vercel.app/products/boosted?id=${id}&isBoosted=${bool}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success("Boost status updated");
                refetch();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='grid grid-cols-4 items-center gap-4 text-grey shadow'>
            <Link to={`/product/${_id}`}><img className='w-[80px] h-[100px]' src={image} alt="" /></Link>
            <div className='flex justify-center  flex-col'>
                <h3 className='text-xs md:text-base'>{title} <br /> <span className='hidden text-xs md:block'>{category} - {subCategory}</span></h3>
                <h3 className='text-xs text-base-300'>{date ? date.slice(0, 10) : ``}</h3>
            </div>
            <div className='flex justify-center items-center'>
                <h3>₹ {price}</h3>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className='flex justify-center items-center'>
                    {
                        isBoosted ? <button onClick={() => handleBoosted(_id, false)} className={`bg-accent text-xl  p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300`} ><BiSolidHot /></button>
                            : <button onClick={() => handleBoosted(_id, true)} className={`bg-primary text-xl  p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300`} ><BiSolidHot /></button>
                    }
                </div>
                <div className='flex justify-center items-center'>
                    <button onClick={() => handleDelete(_id)} className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300'><RiDeleteBin7Line /></button>
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;