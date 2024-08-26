import { createReducer } from '@reduxjs/toolkit';
import { uploadSpotImage } from '../actions/spotImageActions';

const initialState = {
  spotImages: [],
  loading: false,
  error: null,
};

const spotImageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(uploadSpotImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(uploadSpotImage.fulfilled, (state, action) => {
      state.spotImages.push(action.payload);
      state.loading = false;
    })
    .addCase(uploadSpotImage.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
});

export default spotImageReducer;
