import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import VolunteerList from './VolunteerList';
import logo2 from '../../../assets/logos/plus 1.png'

const Event = () => {
    const users = useLoaderData();

    return (
        <div className='lg:flex md:block'>
            <div className='lg:w-1/4 sm:w-full py-12'>
                <div className='flex gap-2'>
                    <img className='w-6' src={logo2} alt="" />
                    <Link to='/addevent'>Add event</Link>
                </div>
            </div>
            <div className='lg:w-3/4 sm:w-full'>
                <p className='py-4 text-2xl font-semibold'>Volunteer Register List</p>
                <VolunteerList users={users} ></VolunteerList>
            </div>
        </div>
    );
};

export default Event;