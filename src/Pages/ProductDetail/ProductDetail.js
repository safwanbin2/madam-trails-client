import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import AddToCartModal from '../../Components/AddToCartModal';
import useAdmin from '../../Hooks/useAdmin';

const ProductDetail = () => {
    const product = useLoaderData();
    const { _id, title, subTitle, category, subCategory, image, description, price } = product;
    // context auth
    const { user, countRefetch, setCountRefetch } = useContext(AuthContext);
    // getting to know if user is admin or not
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    // setting modal product
    const [modalProduct, setModalProduct] = useState({});
    // handling add to cart button
    const handleAddToCartBtn = (product) => {
        setModalProduct(product);
        if (modalProduct) {
            window.my_modal_3.showModal()
        }
    }
    // increasing and decreasing
    const [qty, setQty] = useState(1);
    const handleQty = (bool) => {
        if (bool) {
            setQty(qty + 1);
        }
        else if (!bool && qty > 1) {
            setQty(qty - 1);
        }
        else {
            window.alert("Can not reduce further");
        }
    }
    // adding to wishlist
    const handleAddToWishlist = id => {
        if (!user?.uid) {
            return toast('Log in first', {
                icon: '👏',
            });
        }
        const wishlistItem = {
            "productTitle": title,
            "productSubTitle": subTitle,
            "productCategory": category,
            "productImage": image,
            "productPrice": price,
            "productId": id,
            // "buyerId": ,
            "buyerEmail": user?.email
        }
        fetch(`https://working-title-server.vercel.app/wishlist`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(wishlistItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCountRefetch(!countRefetch);
                    toast.success(data.message);
                }
                else {
                    toast.error(data.message)
                }
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                toast.error("Error");
            })
    }
    return (
        <div className='w-11/12 mx-auto my-6'>
            <h2 className='text-grey text-xl font-semibold'>{title} - {subTitle}</h2>
            <div className="border-t border-[#bdbbbb] my-6"></div>
            <div className='flex flex-col md:grid gap-4' style={{ gridTemplateColumns: "3fr 2fr" }}>
                <img className='w-full h-[400px]' src={image} alt="" />
                <div className='bg-[#ecebeb] shadow-md p-4 text-grey'>
                    <h2 className='text-2xl font-semibold tracking-wider mb-2'>${price}</h2>
                    <h2 className='text-green-500 flex items-center  mb-2'><span className='text-2xl'><TiTick /></span> <span>Available</span></h2>
                    <div className='flex gap-4 items-center'>
                        <div>
                            <h2>Quantity: </h2>
                            <div className='w-24 h-12 grid grid-cols-2 gap-1'>
                                <h2 className='border border-black flex justify-center items-center'><span>{qty}</span></h2>
                                <div className='border flex flex-col gap-1'>
                                    <button className='border border-black' onClick={() => handleQty(true)}>+</button>
                                    <button className='border border-black' onClick={() => handleQty(false)}>-</button>
                                </div>
                            </div>
                        </div>
                        <p className='text-sm'>Minimum quantity for "{title} - {subTitle}" is 1.</p>
                    </div>
                    {
                        isAdmin ? ""
                            : <div className='mt-8 grid grid-cols-2'>
                                <button onClick={() => handleAddToCartBtn(product)} className='px-4 md:px-10 py-2 bg-primary text-white me-4 rounded-3xl hover:shadow-lg text-sm md:text-base'>Add To Cart</button>
                                <button onClick={() => handleAddToWishlist(_id)} className='px-4 md:px-10 py-2 bg-primary text-white me-4 rounded-3xl hover:shadow-lg text-sm md:text-base'>Add To Wishlist</button>
                            </div>
                    }
                    <div className="border-t border-[#bdbbbb] my-6"></div>
                    <ul className='ms-6 mb-6'>
                        <li className='text-grey list-disc text-sm'>Category - {category}</li>
                        <li className='text-grey list-disc text-sm'>Product type - {subCategory}</li>
                        <li className='text-grey list-disc text-sm'>Brand - Champion</li>
                    </ul>
                </div>
            </div>
            <div>
                <h2 className='text-xl text-grey my-4'>Product Description: </h2>
                <ul className='ps-10 mb-6'>
                    <li className='text-grey list-disc text-sm'>Product type - {subCategory}</li>
                    <li className='text-grey list-disc text-sm'>Brand - Champion</li>
                </ul>
                <p className='text-grey'>{description}</p>
            </div>
            {
                modalProduct ? <AddToCartModal
                    product={modalProduct}
                    setProduct={setModalProduct}
                    quantity={qty}
                />
                    : ""
            }
        </div>
    );
};

export default ProductDetail;