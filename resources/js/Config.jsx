import axios from "axios";
import { getToken } from "./pageauth/AuthUser";

const baseUrl = 'http://localhost:8000/api/v1';

axios.defaults.withCredentials = true;

const getAuthHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
    //Publicos
    getRegister: (data) => axios.post(`${baseUrl}/auth/register`, data),
    getLogin: (data) => axios.post(`${baseUrl}/auth/login`, data),
    //Privados
    //Auth
    getLogout: () => axios.get(`${baseUrl}/auth/logout`,{
        headers: getAuthHeader()
    }),

    //User
    getUserById: (userId) => axios.get(`${baseUrl}/user/${userId}`, {
        headers: getAuthHeader()
    }),
    getUserAll: () => axios.get(`${baseUrl}/user/client`, {
        headers: getAuthHeader()
    }),
    deleteUser: (userId) => axios.delete(`${baseUrl}/user/${userId}`, {
        headers: getAuthHeader()
    }),
    getCountUser: () => axios.get(`${baseUrl}/user/client/count`, {
        headers: getAuthHeader()
    }),


    //Routine
    getCountRoutine: () => axios.get(`${baseUrl}/routines/count`, {
        headers: getAuthHeader()
    }),


    //Exercise
    getCountExercise: () => axios.get(`${baseUrl}/exercises/count`, {
        headers: getAuthHeader()
    }),
};
