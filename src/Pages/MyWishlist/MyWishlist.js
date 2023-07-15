import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../Components/LoadingPage';
import WishlistItem from './WishlistItem';

const MyWishlist = () => {
    const { user } = useContext(AuthContext);
    const { data: items, isLoading, refetch } = useQuery({
        queryKey: ["wishlist", "mywishlist", "email", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://working-title-server.vercel.app/wishlist/mywishlist?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    console.log(items);
    return (
        <div className='w-11/12 mx-auto my-6'>
            <h2 className='text-xl text-grey'>Wishlist: </h2>
            {
                isLoading ? <LoadingPage />
                    : <div>{
                        items.map(item => <WishlistItem
                            key={item._id}
                            item={item}
                            refetch={refetch}
                        />)
                    }</div>
            }
        </div>
    );
};

export default MyWishlist;