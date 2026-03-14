import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/auth/Register';
import SignIn from '../pages/auth/SignIn';
import NotFound from '../pages/Error&loading/NotFound';
import Contact from '../pages/Contact/Contact';

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        errorElement:<NotFound/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'contact',
                element:<Contact/>
            },
            {
                path:'register',
                element:<Register/>
            },
            {
                path:'signin',
                element:<SignIn/>
            }
        ]
    }
])

export default router;