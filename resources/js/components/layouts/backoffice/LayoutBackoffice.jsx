import React, { use } from "react";
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import {Outlet, useNavigate} from 'react-router-dom';
import AuthUser from '../../../pageauth/AuthUser';
import { useEffect } from "react";
const LayoutBackoffice = () => {
    const {getRole} = AuthUser();
    const navigate = useNavigate();
    useEffect(() => {
        
        if(getRole() !== 'admin'){
            navigate('/');
        }
    }, [])

    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
}


export default LayoutBackoffice



