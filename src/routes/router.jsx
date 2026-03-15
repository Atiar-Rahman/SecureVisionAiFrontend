import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/auth/Register';
import SignIn from '../pages/auth/SignIn';
import NotFound from '../pages/Error&loading/NotFound';
import Contact from '../pages/Contact/Contact';
import DashboardLayout from '../layouts/DashboardLayout';
import WelCome from '../pages/dashboard/WelCome';
import MultiWebcamStream from '../pages/dashboard/MultiWebcamStream';
import MultiWebcam from '../pages/dashboard/MultiWebcam';

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
    },
    {
        path: 'dashboard',
        element: <DashboardLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: '',
                element: <WelCome/>
            },
            {
                path:'detection',
                element:<MultiWebcamStream/>
            },
            {
                path:'detect',
                element:<MultiWebcam/>
            }
        ]
    },
])

export default router;