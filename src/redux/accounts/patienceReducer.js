import { createSlice } from "@reduxjs/toolkit";
import { getdoctorlist } from "./action";


const initialState= {
    data: [],
    isLoading: false,
    error: null,
    auth:null
  };






export const patienceSlice = createSlice({
    name: 'patience',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getdoctorlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(getdoctorlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
      builder.addCase(getdoctorlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
    },
  });

export default patienceSlice.reducer;