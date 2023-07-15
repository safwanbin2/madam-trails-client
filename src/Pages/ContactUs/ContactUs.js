import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const ContactUs = () => {
    const { user } = useContext(AuthContext);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    let d = new Date();
    let expiryDate = new Date();
    expiryDate.setDate(d.getDate() + 7);
    const finalExpiryDate = expiryDate.getDate();

    const handleFormSubmit = data => {
        const newMessage = {
            senderName: data.name,
            senderEmail: data.email,
            userName: user?.displayName,
            userEmail: user?.email,
            message: data.message,
            date: d,
            expiryDate: finalExpiryDate,
            isRead: false
        }
        console.log(newMessage);
        fetch(`https://working-title-server.vercel.app/messages/newmessage`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newMessage)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Message sent successfully, I will get back to you on Email")
                }
            })
            .catch(err => {
                toast.error("Error occured while sending the message");
                console.error(err);
            })

        reset();
    }
    return (
        <div className='w-11/12 mx-auto my-6 bg-base-100 grid grid-cols-1 md:grid-cols-2 justify-center items-center p-8'>
            <div className="">
                <div>
                    <h1 className='text-4xl font-bold text-[#333333] tracking-wider mb-1 uppercase'>Get in touch</h1>
                    <p className="pt-2 pb-4">Fill in the form and wait for response in the mail</p>
                    <div className="space-y-4">
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Karnataka, India</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                            </svg>
                            <span>+9798904838</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                            <span>example@gmail.com</span>
                        </p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6 ng-untouched ng-pristine ng-valid">
                <h2 className='text-xl text-grey  mt-4 md:mt-0'>Start a conversation: </h2>
                <label className="block">
                    <span className={`${errors.name ? "text-red-600" : "text-grey"} mb-1 `}>Full name</span>
                    <input {...register("name", {
                        required: "Name is required!"
                    })}
                        type="text"
                        placeholder="name"
                        className="text-grey focus:outline-none rounded p-2  w-full" />
                </label>
                <label className="block">
                    <span className={`${errors.email ? "text-red-600" : "text-grey"} mb-1 `}>Email address</span>
                    <input {...register("email", {
                        required: "Email is required!"
                    })}
                        type="email"
                        placeholder="mail"
                        className="bg-grey focus:outline-none rounded p-2  w-full" />
                </label>
                <label className="block">
                    <span className={`${errors.message ? "text-red-600" : "text-grey"} mb-1 `}>Message</span>
                    <textarea {...register("message", {
                        required: "Message can not be Empty!"
                    })} rows="3" className="bg-white focus:outline-none rounded p-2  w-full"></textarea>
                </label>
                <div>
                    <button type="submit" className='px-4 md:px-10 py-2 bg-primary text-white me-4 rounded-3xl hover:shadow-lg'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ContactUs;