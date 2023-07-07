import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Info = ({ profile }) => {
    const { firstName, lastName, phone, email, location } = profile;
    const navigate = useNavigate();
    const [updatedDocuments, setUpdatedDocuments] = useState({
        phone: phone,
        location: ""
    })

    const handleUpdateInfo = info => {
        fetch(`https://working-title-server.vercel.app/users/myprofile?email=${email}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success("Updated Successfully");
                    navigate("/");
                }
            })
            .catch(err => {
                toast.error("Could not update");
                console.error(err);
            })
    }

    return (
        <div>
            <h2 className='text-xl tracking-wider mb-2'>Manage My Account: </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 bg-base-100'>
                <div className=' p-4'>
                    <h2 className='text-lg tracking-wider'>Personal Info: </h2>
                    <div>
                        <div className="form-control mb-2">
                            <label className="label ps-0">
                                <span className="">Name: </span>
                            </label>
                            <input type="text"
                                placeholder="Name"
                                defaultValue={`${firstName} ${lastName}`}
                                disabled
                                className="bg-white focus:outline-none rounded p-2  w-full" />
                        </div>
                        <div className="form-control mb-2">
                            <label className="label ps-0">
                                <span className="">Email: </span>
                            </label>
                            <input type="email"
                                placeholder="email"
                                defaultValue={email}
                                disabled
                                className="bg-white focus:outline-none rounded p-2  w-full" />
                        </div>
                        <div className="form-control mb-2">
                            <label className="label ps-0">
                                <span className="">Phone: </span>
                            </label>
                            <input
                                onChange={(e) => setUpdatedDocuments((prevState) => ({
                                    ...prevState,
                                    phone: e.target.value
                                }))}
                                type="tel"
                                placeholder="phone"
                                defaultValue={phone}
                                className="bg-white focus:outline-none rounded p-2  w-full" />
                        </div>
                    </div>
                </div>
                <div className=' p-4'>
                    <h2 className='text-lg tracking-wider'>Address Book: </h2>
                    <div>
                        <div className="form-control mb-2">
                            <label className="label ps-0">
                                <span className="">Name: </span>
                            </label>
                            <input type="text"
                                placeholder="Name"
                                disabled
                                defaultValue={`${firstName} ${lastName}`}
                                className="bg-white focus:outline-none rounded p-2  w-full" />
                        </div>
                        <div className="form-control mb-2">
                            <label className="label ps-0">
                                <span className="">Location: </span>
                            </label>
                            <input
                                onChange={(e) => setUpdatedDocuments((prevState) => ({
                                    ...prevState,
                                    location: e.target.value
                                }))}
                                type="text"
                                placeholder="location"
                                defaultValue={location}
                                className="bg-white focus:outline-none rounded p-2  w-full" />
                        </div>
                    </div>
                    <div>
                        <label className="label ps-0">
                            <span className="text-error">Updating will reset previous info* </span>
                        </label>
                        <button onClick={() => handleUpdateInfo(updatedDocuments)} className='px-10 py-2 bg-primary text-white me-4 rounded-3xl hover:shadow-lg' type="submit">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;