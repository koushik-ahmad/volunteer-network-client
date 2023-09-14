import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const Main = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;