import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // To store logged-in user details
  isAuthenticated: false, // To track authentication status
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logoutUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});


export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
