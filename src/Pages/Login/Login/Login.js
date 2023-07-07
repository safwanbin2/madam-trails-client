import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import LoadingPage from '../../../Components/LoadingPage';

const Login = () => {
    const { isLoading, logInWithEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        logInWithEmail(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success(`Successfully logged in as ${user?.displayName}`);
                // navigate(from, { replace: true });
                navigate("/");
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to log In, Try again")
            });
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='w-full min-h-screen bg-white pt-6'>
            <div className='w-11/12 md:w-6/12 mx-auto p-4 border  bg-[#ecebeb]'>
                <h2 className='text-xl font-semibold text-grey'>Login to your Account!</h2>
                <p>Don't have an account? <Link className='font-semibold tracking-wider text-grey' to="/register">Register</Link> here</p>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='grid grid-cols-1 gap-2 mb-2'>
                        <div className="form-control mb-2">
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
                        <div className="form-control mb-2">
                            <label className="label ps-0">
                                <span className="">Password</span>
                            </label>
                            <input {
                                ...register("password", {
                                    required: "Password must be at least six character long",
                                })
                            } type="password" placeholder="password" className="bg-white focus:outline-none rounded p-2  w-full" />
                            {errors.password && <label className="label text-red-400 text-xs ps-0">
                                <span className="">Provide Password</span>
                            </label>}
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='px-10 py-2 bg-primary text-white me-4 rounded-3xl hover:shadow-lg' type='submit'>Login to Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;