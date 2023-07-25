import axios from 'axios';
import { API } from '../config';

export const AdminLogin = async (email, password) =>{
    await axios.post(`${API}/login`,{email,password})
}