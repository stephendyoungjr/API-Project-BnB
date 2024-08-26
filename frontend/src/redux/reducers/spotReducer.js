import { createReducer } from '@reduxjs/toolkit';
import { fetchSpots, createSpot } from '../actions/spotActions';

const initialState = {
  spots: [],
  loading: false,
  error: null,
};

const spotReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchSpots.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSpots.fulfilled, (state, action) => {
      state.spots = action.payload;
      state.loading = false;
    })
    .addCase(fetchSpots.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(createSpot.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createSpot.fulfilled, (state, action) => {
      state.spots.push(action.payload);
      state.loading = false;
    })
    .addCase(createSpot.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
});

export default spotReducer;
