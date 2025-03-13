import React, { useState, useEffect } from 'react';
import Config from '../Config';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
const Login = () => {
  const {setToken,getToken} = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   useEffect(() => {    
      if(getToken()){
          navigate('/');
      }
    }, [])

     const submitLogin = async (e) => {
            e.preventDefault();
            
            
            await axios.get('/sanctum/csrf-cookie').then(response => {
              Config.getLogin({email:email,password:password})
              .then(({data})=>{
                  if(data.status === 'success'){
                      setToken(
                        data.user,
                        data.token,
                        data.user.roles[0].name
                      );
                      
                  }else{
                    console.log(data.message);
  
                  }
              })
            });

           
            
        }
  return (
    <div>
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-sm-6'>
                <div className='card mt-5 mb-5'>
                    <div className='card-body'>
                        <h1 className='text-center fw-bolder'>LOGIN</h1>
                        <form onSubmit={submitLogin}>
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
                          
                          <div className='d-flex justify-content-center'>
                              <button type='submit' className='btn btn-primary mt-3 w-100'>Sign Up</button>
                          </div>

                          <a href="/register" className='btn btn-primary mt-3 w-100'>Register</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login