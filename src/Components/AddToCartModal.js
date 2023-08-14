import React, { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const AddToCartModal = ({ product, setProduct, quantity, size }) => {
    const { userDB, user, countRefetch, setCountRefetch } = useContext(AuthContext);
    const [reference, setReference] = useState("");
    const { title, subTitle, price, _id, category, subCategory, image } = product;
    const d = new Date();

    // object of cart item
    const newItem = {
        "productTitle": title,
        "productSubTitle": subTitle,
        "productId": _id,
        "productImage": image,
        "productCategory": category,
        "productSubCategory": subCategory,
        "quantity": quantity,
        "size": size,
        "productPrice": price,
        "buyerName": user?.displayName,
        "buyerEmail": user?.email,
        "buyerPhone": userDB?.phone,
        "buyerId": userDB?._id,
        "addingDate": d,
        "reference": reference
    }

    const handleAddToCart = (newItem) => {
        if (!user) {
            return toast.error("Login to your account first")
        }
        fetch(`https://working-title-server.vercel.app/cart/additem`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setCountRefetch(!countRefetch)
                    toast.success("Added to cart");
                }
            })
            .catch(err => {
                console.error(err)
                toast.error("error occured")
            })

        // setting out the modal
        setProduct("");
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <form method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="text-grey  my-1">{title} - {subTitle}</h3>
                <p className='text-2xl font-semibold text-primary my-1'>₹ {price}</p>
                <h3 className='my-1'>Quantity: {quantity}</h3>
                <h3 className='my-1'>Size: {size}</h3>
                <div className="form-control mb-2">
                    <label className="label ps-0">
                        <span className="text-sm">reference: </span>
                    </label>

                    <textarea
                        onChange={(e) => setReference(e.target.value)}
                        rows="3"
                        type="text"
                        className="bg-white focus:outline-none rounded p-2  w-full"
                        placeholder="Message / reference/ customization" ></textarea>
                </div>


                <button type='submit' className='px-10 py-1 bg-primary text-white me-4 rounded-3xl hover:shadow-lg my-1' onClick={() => handleAddToCart(newItem)}>Add to cart</button>
            </form>
        </dialog>
    );
};

export default AddToCartModal;