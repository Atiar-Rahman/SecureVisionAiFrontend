import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../pages/Error&loading/Loading';

const ProtectedRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const nevigate = useNavigate()

    if(loading){
        return <Loading/>
    }
    if(!user){
        return nevigate('/signin')
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRoute;