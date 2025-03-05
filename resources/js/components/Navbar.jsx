import React from 'react'
import AuthUser from '../pageauth/AuthUser'
import Config from '../Config';

const Navbar = () => {

  const {getRole,getToken, getLogOut} = AuthUser();

  const logoutUser=()=>{
    Config.getLogout().then(response=>{
      console.log(response);
      getLogOut();
    });
  }

  const logout = () =>{
   return( 
     <li className='nav-item me-2'>
          <a className='nav-link' href='#' onClick={logoutUser}>Logout</a>
      </li>
    );
  }

  const renderLinks = () =>{
    if(getToken()){
      if (getRole() === 'admin'){
        //BACKOFFICE
        return(
          <>
            
            <a className='navbar-brand' href='/backoffice'>FitTrack</a>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav ms-auto'>
                    

                    {logout()}
                </ul>
              </div>
          </>
        );
        
      }else{
        //service
        return(
          <>
            
            <a className='navbar-brand' href='/service'>FitTrack</a>
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item me-2'>
                        <a className='nav-link' href='#'>Routines</a>
                    </li>
                    <li className='nav-item me-2'>
                        <a className='nav-link' href='#'>Exercises</a>
                    </li>
                    <li className='nav-item me-2'>
                        <a className='nav-link' href='#'>Profile</a>
                    </li>
                    {logout()}
                </ul>
              </div>
          </>
        );
      }
     
    }else{
      return(
        <><a className='navbar-brand' href='/'>FitTrack</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto'>
                <li className='nav-item me-2'>
                    <a className='nav-link' href='/login'>Login</a>
                </li>
                
            </ul>
          </div>
        </>
      );
    }

  }


  return (
    <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container'>
            {renderLinks()}
        </div>
    </nav>
  )
}

export default Navbar