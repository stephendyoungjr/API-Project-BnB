import { createReducer } from '@reduxjs/toolkit';
import { fetchBookings, createBooking } from '../actions/bookingActions';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchBookings.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchBookings.fulfilled, (state, action) => {
      state.bookings = action.payload;
      state.loading = false;
    })
    .addCase(fetchBookings.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(createBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createBooking.fulfilled, (state, action) => {
      state.bookings.push(action.payload);
      state.loading = false;
    })
    .addCase(createBooking.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
});

export default bookingReducer;
