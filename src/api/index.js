import axios from 'axios';

const URL = "http://localhost:8096";

export const logintk = (payload) => axios.post(`${URL}/api/login`,payload);
export const registertk = () => axios.post(`${URL}/api/register`);
export const forgotpasstk = (payload) => axios.post(`${URL}/api/choosepass`,payload);
export const authenemailgetpass = (payload) => axios.post(`${URL}/api/createcodeauthenemail`,payload);
export const createaccount = (payload) => axios.post(`${URL}/api/register`,payload);
export const getAllpost = () => axios.post(`${URL}/api/getPost`);
export const addlikepost = (payload) => axios.post(`${URL}/`)
