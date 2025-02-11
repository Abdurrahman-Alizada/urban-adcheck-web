"use client";

const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    reviews: null, 
};

const reviewSlice=createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReviews(state, action) {
            state.reviews = action.payload.reviews;
        },
    },
})