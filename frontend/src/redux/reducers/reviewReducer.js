import { createSlice } from '@reduxjs/toolkit';
import { fetchReviews, createReview, deleteReview } from '../actions/reviewActions';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        return state.filter(review => review.id !== action.payload);
      });
  },
});

export default reviewsSlice.reducer;
