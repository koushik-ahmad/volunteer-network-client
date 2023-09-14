import React, { useContext } from 'react';
import logo from '../../assets/logos/Group 1329.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user, logOut } = useContext(UserContext);

    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/donation'>Donation</Link></li>
                        <li><Link to='/events'>Events</Link></li>
                        <li><Link to='/blog'>Blog</Link></li>
                        <li><Link to='/profile'>{user?.displayName ? user?.displayName : 'Profile'}</Link></li>
                    </ul>
                </div>
                <img className='w-36' src={logo} alt="" />
            </div>
            <div className="navbar-end hidden lg:flex ">
                <ul className="menu menu-horizontal px- font-semibold ">
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/donation'>Donation</Link></li>
                    <li><Link to='/events'>Events</Link></li>
                    <li><Link to='/blog'>Blog</Link></li>
                    {
                        user?.email ?
                            <>
                                {/* <button className='btn-sm'>{user.displayName}</button> */}
                                <li><Link to='/profile'>{user?.displayName ? user?.displayName : 'Profile'}</Link></li>
                                <button onClick={logOut} className='btn btn-sm btn-success'>log Out</button>
                            </>
                            :
                            <>
                                <Link to='/register'><button className='btn btn-sm btn-success'>Register</button></Link>
                                <Link to='/login'><button className='btn btn-sm btn-success ml-1'>Login</button></Link>
                            </>
                    }
                </ul>
            </div>
            <div className="navbar-end lg:hidden sm:flex">
                {
                    user?.email ?
                        <button onClick={logOut} className='btn btn-sm btn-success'>log Out</button>
                        :
                        <Link to='/login'><button className='btn btn-sm btn-success'>Login</button></Link>
                }
            </div>
        </div>
    );
};

export default Header;