import React from 'react';
import TableUser from '../../../Components/AdminComponents/TableUser';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../../Components/LoadingPage';

const Users = () => {
    const { data: users, isLoading } = useQuery({
        queryKey: ["role"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/all?role=user`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            <h2 className='text-xl my-6 text-grey'>Consumers: </h2>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between py-4dark:bg-gray-800">

                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Creation
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(fan => <TableUser
                                    key={fan._id}
                                    user={fan}
                                />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;