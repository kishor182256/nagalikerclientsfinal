import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './action';

const initialState= {
    token: null,
    isLoading: false,
    error: null,
    auth:null
  };






export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      });
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
    },
  });

export default authSlice.reducer;