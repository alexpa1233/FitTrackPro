import React, { useState, useEffect } from 'react'
import Config from '../Config';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';


const Register = () => {
    const {getToken} = AuthUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        
        if(getToken()){
            navigate('/');
        }
    }, [])


    const submitRegister = async (e) => {
        e.preventDefault();
        Config.getRegister({name:name,email:email,password:password})
        .then(({data})=>{
            if(data.status === 'created'){
                navigate('/login');
            }
        })
        
    }

return (
    <div>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-sm-6'>
                    <div className='card mt-5 mb-5'>
                        <div className='card-body'>
                            <h1 className='text-center fw-bolder'>REGISTER</h1>
                            <form onSubmit={submitRegister}>
                                    <div className='form-group'>
                                            <label>Name</label>
                                            <input type='text' 
                                            className='form-control' 
                                            value={name} onChange={(e) => setName(e.target.value)} 
                                            required/>
                                    </div>
                                    <div className='form-group'>
                                            <label>Email</label>
                                            <input type='email' 
                                            className='form-control' 
                                            value={email} onChange={(e) => setEmail(e.target.value)} 
                                            required/>
                                    </div>
                                    <div className='form-group'>
                                            <label>Password</label>
                                            <input type='password' 
                                            className='form-control'
                                            value={password} onChange={(e) => setPassword(e.target.value)} 
                                            required/>
                                    </div>
                                    <div className="">
                                        <div className="d-flex justify-content-between gap-2">
                                            <div className="form-check style-check d-flex align-items-start">
                                                <input className="form-check-input border border-neutral-300 mt-4 me-2" type="checkbox" value="" id="condition"/>
                                                <label className="form-check-label text-sm" htmlFor="condition">
                                                    By creating an account means you agree to the 
                                                    <a href="#" className="text-primary-600 fw-semibold">Terms & Conditions</a> and our <a href="#" className="text-primary-600 fw-semibold">Privacy Policy</a>
                                                </label>
                                            </div> 
                                        </div>
                                    </div>
                                    
                                    <div className='d-flex justify-content-center'>
                                        <button type='submit' className='btn btn-primary mt-3 w-100'>Sign Up</button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Register