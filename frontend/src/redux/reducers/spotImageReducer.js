import { createReducer } from '@reduxjs/toolkit';
import { setSpotImages, addSpotImage, removeSpotImage } from '../actions/spotImageActions';

const initialState = [];

const spotImageReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setSpotImages, (state, action) => {
            return action.payload;
        })
        .addCase(addSpotImage, (state, action) => {
            state.push(action.payload);
        })
        .addCase(removeSpotImage, (state, action) => {
            return state.filter(image => image.id !== action.payload);
        });
});

export default spotImageReducer;
