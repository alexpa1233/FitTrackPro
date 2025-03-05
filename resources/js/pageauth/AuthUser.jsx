import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    return tokenString ? JSON.parse(tokenString) : null;
};

const getUser=()=>{     
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
}


const getRole=()=>{
    const roleString = sessionStorage.getItem('role');
    return roleString ? JSON.parse(roleString) : null;
}

const AuthUser = () => {
    const navigate = useNavigate();

    

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [role, setRole] = useState(getRole());

    const saveToken=(user, token, rol)=>{
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('role', JSON.stringify(rol));


        setUser(user);
        setToken(token);
        setRole(rol);

        

        if(getRole() === 'admin'){
            navigate('/backoffice');
        }else{
            navigate('/service');
        }
    }


    const getLogOut=()=>{
        sessionStorage.clear();
        navigate('/');
    }

  return {
    setToken: saveToken,
    token,
    user,
    role,
    getLogOut,getToken,getUser,getRole
  }
}

export{getToken,getUser,getRole};
export default AuthUser