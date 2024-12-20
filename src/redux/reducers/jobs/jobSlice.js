import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: null, 
};

const jobSlice = createSlice({
    name: 'job',
    initialState,
});


export const {  } = jobSlice.actions;
export default jobSlice.reducer;
