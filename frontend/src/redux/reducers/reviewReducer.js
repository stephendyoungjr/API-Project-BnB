import { createReducer } from '@reduxjs/toolkit';
import { fetchReviews, createReview } from '../actions/reviewActions';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchReviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    })
    .addCase(fetchReviews.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(createReview.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
      state.loading = false;
    })
    .addCase(createReview.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
});

export default reviewReducer;
