import React, { useState } from 'react';
import img3 from '../../../assets/logos/trash-2 9.png';

const VolunteerList = ({ users }) => {
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = user => {
        const agree = window.confirm(`Are you sure you want to deleted: ${user.name}`);
        if (agree) {
            fetch(`https://volunteer-network-server-dusky.vercel.app/user/${user._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('User deleted successfully');
                        const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUsers);
                    }
                })
        }
    }

    return (
        <div className="overflow-x-auto pb-5 mr-2">
            <table className="table table-sm">
                <thead className='bg-gray-100'>
                    <tr>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Description</th>
                        <th>Volunteer list</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    displayUsers.map(user => <tbody
                        key={user._id}
                    >
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.description}</td>
                            <td>{user.book}</td>
                            <td>
                                <button onClick={() => handleDelete(user)}><img className='w-8 p-1 bg-red-600 rounded-md' src={img3} alt="" /></button>
                            </td>
                        </tr>
                    </tbody>)
                }
            </table>
        </div>
    );
};

export default VolunteerList;