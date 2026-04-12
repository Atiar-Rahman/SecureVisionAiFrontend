import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import SignIn from '../pages/auth/SignIn';
import NotFound from '../pages/Error&loading/NotFound';
import Contact from '../pages/Contact/Contact';
import DashboardLayout from '../layouts/DashboardLayout';
import WelCome from '../pages/dashboard/WelCome';
import MultiWebcamStream from '../pages/dashboard/MultiWebcamStream';
import MultiWebcam from '../pages/dashboard/MultiWebcam';
import Register from '../pages/auth/Register';
import Profile from '../pages/dashboard/Profile';
import CameraAdd from '../pages/dashboard/CameraAdd';
import CameraList from '../pages/dashboard/CameraList';
import AlertShow from '../pages/dashboard/AlertShow';
import ProtectedRoute from './ProtectedRoute';
import ShowAllContactUser from '../pages/dashboard/ShowAllContactUser';
import ModelStatus from '../pages/dashboard/ModelStatus';
import CameraEdit from '../pages/dashboard/CameraEdit';
import WebcamMulti from '../pages/dashboard/WebcamMulti';
import CNN3DDetection from '../pages/dashboard/CNN3DDetection';

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
                path:'contact/',
                element:<ProtectedRoute><Contact/></ProtectedRoute>
            },
            {
                path:'register/',
                element:<Register/>
            },
            {
                path:'signin/',
                element:<SignIn/>
            },
            {
                path: '/detection',
                element: <MultiWebcamStream />
            },
        ]
    },
    {
        path: 'dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
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
            },
            {
                path:'profile',
                element:<Profile/>
            },
            {
                path:'add-camera',
                element:<CameraAdd/>
            },
            {
                path:'camera-edit/:id',
                element:<CameraEdit/>
            },
            {
                path:'camera-list',
                element:<CameraList/>
            },
            {
                path:'alert-show',
                element:<AlertShow/>
            },
            {
                path:'contacts-user',
                element:<ShowAllContactUser/>
            },
            {
                path:"model-status",
                element:<ModelStatus/>
            },
            {
                path:'detection-skip',
                element:<WebcamMulti/>
            },{
                path:'detection-3dcnn',
                element:<CNN3DDetection/>
            }
        ]
    },
])

export default router;