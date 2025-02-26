import React, { useEffect } from "react";
import Footer from '../../Footer';
import Navbar from '../../Navbar';
import {Outlet, useNavigate} from 'react-router-dom';
import AuthUser from "../../../pageauth/AuthUser";

const LayoutService = () => {
    const {getRole} = AuthUser();
    const navigate = useNavigate();
    useEffect(() => {
        
        if(getRole() !== 'client'){
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

export default LayoutService




