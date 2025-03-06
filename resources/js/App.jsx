import React from 'react'
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pagepublic/Home';
import ProtectedRoutes from './pageauth/ProtectedRoutes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LayoutBackoffice from './components/layouts/backoffice/LayoutBackoffice';
import LayoutService from './components/layouts/service/LayoutService';
import LayoutPublic from './components/layouts/LayoutPublic';

import Login from './pageauth/Login';
import Register from './pageauth/Register';

import Dashboard from './pagebackoffice/Dashboard';


import Service from './pageservice/Service';
import UserDetail from './pagebackoffice/user/UserDetail';
import UserAll from './pagebackoffice/user/UserAll';

const App = () => {
    return(
       <Router>
            <Routes>
                <Route path="/" element={<LayoutPublic/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>
                
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/backoffice" element={<LayoutBackoffice/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="user" element={<UserAll/>} />
                        <Route path="user/:id" element={<UserDetail/>} />
                        <Route path="exercise" element={<Register/>}/> 
                        <Route path="routine" element={<Register/>}/>    
                    </Route>
                    <Route path="/service" element={<LayoutService/>}>
                        <Route index element={<Home/>}/>
                        <Route index element={<Service/>}/>
                    </Route>
                </Route>
            </Routes>
       </Router>
    )
}

export default App

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
       
        <App/>
        
    )
}