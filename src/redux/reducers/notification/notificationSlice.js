import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: null, 
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
});


export const {  } = notificationSlice.actions;
export default notificationSlice.reducer;
