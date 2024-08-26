import { createSlice } from '@reduxjs/toolkit';
import { fetchBookings, createBooking } from '../actions/bookingActions';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default bookingsSlice.reducer;
