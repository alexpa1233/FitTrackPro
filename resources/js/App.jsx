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

import ExerciseAll from './pagebackoffice/exercise/ExerciseAll';
import ExerciseEdit from './pagebackoffice/exercise/ExerciseEdit';
import ExerciseCreate from './pagebackoffice/exercise/ExerciseCreate';

import RoutineAll from './pagebackoffice/routine/RoutineAll';
import TypeAll from './pagebackoffice/type/TypeAll';
import Exercises from './pageservice/exercise/Exercises';


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

                        <Route path="exercise" element={<ExerciseAll/>}/>
                        <Route path="exercise/create" element={<ExerciseCreate/>}/>
                        <Route path="exercise/edit/:id" element={<ExerciseEdit/>}/>
                        
                        <Route path="routine" element={<RoutineAll/>}/>
                        <Route path='routine/:id' element={<RoutineAll/>}/>

                        <Route path="type" element={<TypeAll/>}/>   
                    </Route>
                    <Route path="/service" element={<LayoutService/>}>
                        <Route index element={<Service/>}/>
                        <Route path="exercise" element={<Exercises/>}/>   
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