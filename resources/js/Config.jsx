import axios from "axios";

const baseUrl = 'http://localhost:8000/api/v1';
//route


export default{
    getRegister:(data)=>axios.post(`${baseUrl}/auth/register`,data),
    getLogin:(data)=>axios.post(`${baseUrl}/auth/login`,data),
    getLogout:()=>axios.get(`${baseUrl}/auth/logout`),
}