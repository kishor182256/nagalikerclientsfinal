import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../config';





export const loginUser = createAsyncThunk(
  'login/user',
  async (payload) => {
    const { email, password } = payload;
    try{
        const response = await axios.post(`${API}/login`, { email, password });
       return response.data;
    }catch(err){
       return err;
    }
  }
);



