import React from 'react';
import photo from '../../../Assets/photo/profile.jpg';

const Message = ({ message }) => {
    const {message: body, senderName, senderEmail,date} = message;
    console.log(message);
    return (
        <article className='p-4 shadow'>
            <div class="flex items-center mb-2 space-x-4">
                <img class="w-10 h-10 rounded-full" src={photo} alt="" />
                <div class="space-y-1 font-medium ">
                    <p>{senderName} <time class="block text-sm">{senderEmail}</time></p>
                </div>
            </div>
            <footer class="mb-2 text-xs text-gray-500 "><p>Message Sent on <time datetime="2017-03-03 19:00">{date.slice(0, 10)}</time></p></footer>
            <p class="mb-2 text-xm">{body}</p>
        </article>
    );
};

export default Message;