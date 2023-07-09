import React from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai';
import { TiTickOutline } from 'react-icons/ti';
import { BsArrowRightCircle } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Line } from 'react-icons/ri';

const OrderItem = ({ order, refetch }) => {
    const { products, buyerName, buyerLocation, paymentMethod, summary, _id, status, createdAt } = order;
    console.log(order);

    const handleUpdateStatus = (id, status) => {
        const consent = window.confirm("Are you sure you want to approve/update the order status?");
        if (consent) {
            fetch(`http://localhost:5000/orders/updatestatus?id=${id}&status=${status}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        toast.success("Order status updated");
                        refetch();
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Error Occured");
                })
        }
    }

    const handleDeleteOrder = id => {
        const consent = window.confirm("Deleting will erease the data from Database & will be lost forever");
        if (consent) {
            fetch(`http://localhost:5000/orders/delete?id=${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        toast.success("Deleted successfully");
                        refetch();
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Error Occured");
                })
        }
    }

    return (
        <div className='shadow p-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0'>
            <div>
                <h3>Recipeint: {buyerName}</h3>
                <h3>Location: {buyerLocation}</h3>
                <h3 className='text-xs'>Placed at: {createdAt.slice(0, 10)}</h3>
            </div>
            <div>
                {
                    products.map(product => <div
                        key={product._id}
                        className=''
                    >
                        <h3>{product.productTitle}</h3>
                        <h3 className='text-sm'>₹ {product.productPrice} x {product.quantity}</h3>
                    </div>)
                }
            </div>
            <div>
                <h3 className='text-sm'>Payment Method: <span className='text-green-500'>{paymentMethod}</span></h3>
                <h3 className='text-sm'>Total Items: {summary?.subTotalItems}</h3>
                <h3 className='text-sm'>Total Price: ₹ {summary?.totalPrice}</h3>
            </div>
            <div className='flex flex-row md:flex-col gap-2'>
                <div className='flex justify-center items-center'>
                    <Link className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300' to={`/myorders/${_id}`}><AiOutlineEye /></Link>
                </div>
                <div className='flex justify-center items-center'>
                    {
                        status === "pending" && <button onClick={() => handleUpdateStatus(_id, "picked")} title='Approve' className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300'>
                            <BsArrowRightCircle />
                        </button>
                    }
                    {
                        status === "picked" && <button onClick={() => handleUpdateStatus(_id, "ondelivery")} title='on delivery' className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300'>
                            <TbTruckDelivery />
                        </button>
                    }
                    {
                        status === "ondelivery" && <button onClick={() => handleUpdateStatus(_id, "delivered")} title='Delivered' className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300'>
                            <TiTickOutline />
                        </button>
                    }
                    {
                        status === "delivered" && <button onClick={() => handleDeleteOrder(_id)} title='Delete Order from Database' className=' text-xl bg-primary p-1 rounded-[50%] text-white hover:bg-white hover:border-primary hover:text-primary border border-transparent transition-all duration-300'>
                            <RiDeleteBin7Line />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderItem;