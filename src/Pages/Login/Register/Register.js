import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import saveUser from '../../../Hooks/saveUser';
import { toast } from 'react-hot-toast';
import LoadingPage from '../../../Components/LoadingPage';

const Register = () => {
    const { createUser, user: User, isLoading, setIsLoading, update } = useContext(AuthContext);
    const [consent, setConsent] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const date = new Date();
    const navigate = useNavigate();

    const handleRegister = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                if (user.uid) {
                    updateUserData(`${data.firstName} ${data.lastName}`);
                    saveUser(data.email, data.firstName, data.lastName, data.phone, date);
                    setIsLoading(false);
                    navigate("/");
                }
                toast.success(`Account created`);
                console.log(user);
            })
            .catch(err => {
                console.error(err)
                setIsLoading(false);
                if (err.message) {
                    return toast.error(err.message)
                }
                toast.error("Error creating account")
            });
    }
    console.log(User);
    const updateUserData = (name) => {
        update(name)
            .then(() => { })
            .catch(err => console.error(err));
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='w-full min-h-[80vh] bg-white pt-6 flex justify-center items-center'>
            <div className='w-11/12 md:w-6/12 mx-auto p-4 border  bg-info'>
                <h2 className='text-xl font-semibold text-grey'>Create your Account!</h2>
                <p>Already have account? <Link className='font-semibold tracking-wider text-grey' to="/login">Login</Link> here</p>
                <form onSubmit={handleSubmit(handleRegister)} className='mt-2'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-2'>
                        <div className="form-control">
                            <label className="label ps-0">
                                <span className="">First Name</span>
                            </label>
                            <input {
                                ...register("firstName", {
                                    required: "Can not be empty"
                                })
                            } type="text" placeholder="first name" className="bg-white focus:outline-none rounded p-2  w-full" />
                            {errors.firstName && <label className="label text-red-400 text-xs ps-0">
                                <span className="">{errors.firstName.message}</span>
                            </label>}
                        </div>
                        <div className="form-control">
                            <label className="label ps-0">
                                <span className="">Last Name</span>
                            </label>
                            <input {
                                ...register("lastName", {
                                    required: "Can not be empty"
                                })
                            } type="text" placeholder="last name" className="bg-white focus:outline-none rounded p-2   w-full" />
                            {errors.lastName && <label className="label text-red-400 text-xs ps-0">
                                <span className="">{errors.lastName.message}</span>
                            </label>}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-2'>
                        <div className="form-control">
                            <label className="label ps-0">
                                <span className="">Password</span>
                            </label>
                            <input {
                                ...register("password", {
                                    required: "Password must be at least six character long",
                                    minLength: 6
                                })
                            } type="password" placeholder="password" className="bg-white focus:outline-none rounded p-2  w-full" />
                            {errors.password && errors.password.type === 'required' && <label className="label text-red-400 text-xs ps-0">
                                <span className="">Password is required</span>
                            </label>}
                            {
                                errors.password && errors.password.type === 'minLength' && <label className="label text-red-400 text-xs ps-0">
                                    <span className="">Password is must be avobe 6 character</span>
                                </label>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label ps-0">
                                <span className="">Gender</span>
                            </label>
                            <select {
                                ...register("gender", {
                                    required: "gender required"
                                })
                            } className=" bg-white focus:outline-none rounded p-2  w-full">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <label className="label text-red-400 text-xs ps-0">
                                <span className="">{errors.gender.message}</span>
                            </label>}
                        </div>
                        {/* <div className="form-control">
                            <label className="label ps-0">
                                <span className="">Confirm Password</span>
                            </label>
                            <input {
                                ...register("confirmPassord", {
                                    required: "Repeat your password"
                                })
                            } type="password" placeholder="password" className="bg-white focus:outline-none rounded p-2   w-full" />
                        </div> */}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-2'>
                        <div className="form-control">
                            <label className="label ps-0">
                                <span className="">Email</span>
                            </label>
                            <input {
                                ...register("email", {
                                    required: "Provide an email"
                                })
                            } type="email" placeholder="email" className="bg-white focus:outline-none rounded p-2  w-full" />
                            {errors.email && <label className="label text-red-400 text-xs ps-0">
                                <span className="">{errors.email.message}</span>
                            </label>}
                        </div>
                        <div className="form-control">
                            <label className="label ps-0">
                                <span className="">Phone Number</span>
                            </label>
                            <input {
                                ...register("phone", {
                                    required: "Provide a phone number"
                                })
                            } type='tel' placeholder="phone" className="bg-white focus:outline-none rounded p-2   w-full" />
                            {errors.phone && <label className="label text-red-400 text-xs ps-0">
                                <span className="">{errors.phone.message}</span>
                            </label>}
                        </div>
                    </div>
                    <div className="form-control mb-4">
                        <label className="cursor-pointer px-0 label justify-start gap-2">
                            <input onClick={() => setConsent(!consent)} type="checkbox" className="checkbox checkbox-success h-5 w-5" />
                            <span className="label-text text-base">
                                I agree to Madamtrails's <Link className='text-blue-500' to="/termsofuse">Terms of Use</Link> , <Link className='text-blue-500' to="/privacypolicy">Privacy Policy</Link>, and <Link className='text-blue-500' to="/cookiepolicy">Cookie Policy</Link>
                            </span>
                        </label>
                    </div>
                    {
                        consent ?
                            <div className='flex justify-center items-center'>
                                <button className='px-10 py-2 bg-primary text-white me-4 rounded-3xl hover:shadow-lg' type='submit'>Create Account</button>
                            </div>
                            :
                            <div className='flex justify-center items-center'>
                                <button disabled className='px-10 py-2 text-white bg-base-300 me-4 rounded-3xl hover:shadow-lg'>Create Account</button>
                            </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default Register;