import React from 'react';

const TableUser = ({ user }) => {
    const { createDate, email, firstName, lastName, phone, location } = user;
    return (
        <tr className=" border-b">
            <th scope="row" className=" px-6 py-4 text-gray-900 whitespace-nowrap ">
                <div className="">
                    <div className="text-base font-semibold">{firstName} {lastName}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                {email}
            </td>
            <td className="px-6 py-4">
                {phone}
            </td>
            <td className="px-6 py-4">
                {location}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{createDate.slice(0, 10)}
                </div>
            </td>
        </tr>
    );
};

export default TableUser;