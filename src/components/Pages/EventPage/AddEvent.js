import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../../../assets/logos/users-alt 1.png';
import { UserContext } from '../../../contexts/AuthContext';

const AddEvent = () => {
    const { user } = useContext(UserContext);
    const [event, setEvent] = useState([]);

    const handleAddEvent = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const date = form.date.value;
        const text = form.text.value;
        const banner = form.banner.value;
        const email = user.email;
        const details = { email, title, date, text, banner };


        fetch('https://volunteer-network-server-dusky.vercel.app/event', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Event added successfully');
                    form.reset();
                }
            })

        console.log(details);
    }



    return (
        <div className='lg:flex md:block'>
            <div className='lg:w-1/4 sm:w-full py-12'>
                <div className='flex gap-2 pb-5'>
                    <img className='w-6' src={logo1} alt="" />
                    <Link to='/events'>Volunteer register list</Link>
                </div>
            </div>
            <div className='lg:w-3/4 sm:w-full'>
                <p className='py-4 text-2xl font-semibold'>Add Event</p>

                <form onSubmit={handleAddEvent}>
                    <div className='flex gap-10'>
                        <div className=''>
                            <label htmlFor="title" className=''>Event Title </label>
                            <input type="text" id='title' placeholder="Enter Title" className="input input-bordered px-10 w-full max-w-xs" required />
                        </div>
                        <div>
                            <label htmlFor="title">Event Date </label>
                            <input type="text" id='date' placeholder="20-08-2023" className="input input-bordered px-10 w-full max-w-xs" />
                        </div>
                    </div>

                    <div className='flex gap-10 pt-10'>
                        <div className=''>
                            <label htmlFor="title" className=''>Description </label>
                            <textarea id='text' placeholder="Enter Designation" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                        </div>
                        <div className='pl-6'>
                            <label htmlFor="banner">Banner Image</label>
                            <input type="text" id='banner' placeholder="Choose Banner Image" className="input input-bordered px-10 w-full max-w-xs" required />
                        </div>
                    </div>
                    <div className='py-8 '>
                        <button className="btn btn-outline btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;