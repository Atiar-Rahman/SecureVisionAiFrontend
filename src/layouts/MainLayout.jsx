import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';

const MainLayout = () => {
    return (
        <div className='container mx-auto'>
            <div>
                <Navbar/>
            </div>
            <div>
                <Outlet/>
            </div>
            <div></div>
        </div>
    );
};

export default MainLayout;