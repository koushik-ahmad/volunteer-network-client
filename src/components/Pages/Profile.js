import React, { useContext, useEffect, useState } from 'react';
import img1 from '../../assets/images/extraVolunteer.png'
import { Link, useLoaderData } from 'react-router-dom';
import { UserContext } from '../../contexts/AuthContext';

const Profile = () => {
    const { user, logOut } = useContext(UserContext);
    const [displayEvent, setDisplayEvent] = useState([]);

    useEffect(() => {
        fetch(`https://volunteer-network-server-dusky.vercel.app/event?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                setDisplayEvent(data);
            })
    }, [user?.email, logOut]);


    const handleDelete = evt => {
        const agree = window.confirm(`Are you sure you want to deleted ${evt.title}`);
        if (agree) {
            fetch(`https://volunteer-network-server-dusky.vercel.app/event/${evt._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('User deleted successfully')
                        const remainingEvent = displayEvent.filter(event => event._id !== evt._id);
                        setDisplayEvent(remainingEvent);
                    }
                })
        }
    }

    return (
        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10 lg:py-10 lg:px-20 md:py-5 md:px-5 sm:py-5 sm:px-5 '>
            {
                displayEvent.map(evt => <div
                    key={evt._id}
                >
                    <div className="card card-side border-2 bg-base-100 shadow-xl">
                        <figure><img src={evt?.banner ? evt?.banner : img1} className='w-60 pl-10 p-8' alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{evt.title}</h2>
                            <p>{evt.date}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleDelete(evt)} className="btn btn-ghost btn-active capitalize">Cancel</button>
                                <Link to={`/update/${evt._id}`}>
                                    <button className="btn btn-accent  capitalize">Update</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Profile;