import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingPage from '../../../Components/LoadingPage';
import Message from './Message';

const Messages = () => {
    const { data: messages, isLoading } = useQuery({
        queryKey: ["mesages", "all"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/messages/all`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className='text-xl my-6 text-grey'>Messages: </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    messages.map(message => <Message
                        key={message._id}
                        message={message}
                    />)
                }
            </div>
        </div>
    );
};

export default Messages;