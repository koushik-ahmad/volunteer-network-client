import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const EventUpdate = () => {
    const storedEvent = useLoaderData();
    const [storeEvent, setStoreEvent] = useState({});


    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const date = form.date.value;
        const text = form.text.value;
        const banner = form.banner.value;
        const details = { title, date, text, banner };


        fetch(`https://volunteer-network-server-dusky.vercel.app/event/${storedEvent._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('User Updated');
                    console.log(data);
                }
            })
    }

    return (
        <div>
            <h2 className='text-center text-2xl font-semibold py-5'>Please Update your Event: {storedEvent.title}</h2>

            <form onSubmit={handleUpdate}
                className='w-1/2 mx-auto' >
                <div className='flex gap-10'>
                    <div className=''>
                        <label htmlFor="title" className=''>Event Title </label>
                        <input type="text" id='title' defaultValue={storedEvent.title} placeholder="Enter Title" className="input input-bordered px-10 w-full max-w-xs" required />
                    </div>
                    <div>
                        <label htmlFor="title">Event Date </label>
                        <input type="text" id='date' defaultValue={storedEvent.date} placeholder="20-08-2023" className="input input-bordered px-10 w-full max-w-xs" />
                    </div>
                </div>

                <div className='flex gap-10 pt-10'>
                    <div className=''>
                        <label htmlFor="title" className=''>Description </label>
                        <textarea id='text' defaultValue={storedEvent.text} placeholder="Enter Designation" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                    </div>
                    <div className='pl-6'>
                        <label htmlFor="banner">Banner Image</label>
                        <input type="text" defaultValue={storedEvent.banner} id='banner' placeholder="Choose Banner Image" className="input input-bordered px-10 w-full max-w-xs" required />
                    </div>
                </div>
                <div className='py-8 '>
                    <button className="btn btn-outline btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EventUpdate;