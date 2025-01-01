'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  packages: null, 
};

const packageSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {
        setPackages(state, action) {
            state.packages = action.payload.packages;
        },
    },
});


export const { setPackages, } = packageSlice.actions;
export default packageSlice.reducer;
