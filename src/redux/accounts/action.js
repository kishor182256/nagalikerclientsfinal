import axios from "axios";
import { API } from "../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";


const TOKEN = localStorage.getItem('logintoken');


export const getdoctorlist = createAsyncThunk(
    'getdoctorlist/getdoctorlist',
    async () => {
      try{
          const response = await axios.get(`${API}/getdoctorlist`, {
            headers: { authtoken: `${TOKEN}` },
          });
         return response.data;
      }catch(err){
         return err;
      }
    }
  );