import React from 'react';

const LoadingPage = () => {
    return (
        <div className='min-h-screen bg-white w-full flex justify-center items-center'>
            <span className="text-primary loading loading-ring loading-lg"></span>
        </div>
    );
};

export default LoadingPage;