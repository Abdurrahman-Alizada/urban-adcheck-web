'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chat: {}
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      
    },
});


export const { } = chatSlice.actions;
export default chatSlice.reducer;
