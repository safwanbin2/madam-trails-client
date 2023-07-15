import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const CustomerDetails = () => {
    const { userDB, isUserDBLoading } = useContext(AuthContext);

    return (
        <div className={`p-6 shadow mb-4 border ${(!userDB?.phone || !userDB?.location) ? "border-red-500" : "border-transparent"}`}>
            {
                !userDB?._id && isUserDBLoading ? <h2>Loading...</h2>
                    : <div className='relative'>
                        <h3 className='text-sm tracking-wide my-1'>Deliver to: {userDB?.firstName} {userDB?.lastName}</h3>
                        <h3 className='text-sm tracking-wide my-1'>Contact: {userDB?.phone}</h3>
                        <h3 className='text-sm tracking-wide my-1'>Email: {userDB?.email}</h3>
                        <h3 className='text-sm tracking-wide my-1'>Location: {userDB?.location}</h3>

                        <Link to="/myprofile" className={`absolute top-0 right-0 ${(!userDB?.phone || !userDB?.location) ? "text-error" : "text-blue-500"}`}>Edit</Link>
                    </div>
            }
        </div>
    );
};

export default CustomerDetails;