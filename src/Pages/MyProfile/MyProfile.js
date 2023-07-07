import React, { useContext } from 'react';
import LoadingPage from '../../Components/LoadingPage';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Info from './Info';
import RecievedOrders from './RecievedOrders/RecievedOrders';

const MyProfile = () => {
    const { logOut, userDB: profile, isUserDBLoading, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        const consent = window.confirm("Are you sure you want to logout?");
        if (consent) {
            logOut()
                .then(() => {
                    toast.success("Successfully logged out");
                    navigate("/");
                })
                .catch(err => {
                    console.error(err);
                    toast.error("failed to log out");
                });
        }
    }

    if (isLoading || isUserDBLoading) {
        return <LoadingPage />
    }

    return (
        <div className='w-11/12 mx-auto my-6'>
            <Info
                profile={profile}
            />
            <RecievedOrders />
            <button onClick={handleLogOut} className='px-10 py-1 bg-primary text-white me-4 rounded-3xl hover:shadow-lg' type='submit'>Log Out</button>
        </div>
    );
};

export default MyProfile;