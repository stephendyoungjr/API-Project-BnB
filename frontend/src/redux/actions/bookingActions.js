import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async (spotId, thunkAPI) => {
  try {
    const response = await fetch(`/api/spots/${spotId}/bookings`);
    if (response.ok) {
      const data = await response.json();
      return data.Bookings;
    } else {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const createBooking = createAsyncThunk('bookings/createBooking', async ({ spotId, booking }, thunkAPI) => {
  try {
    const response = await fetch(`/api/spots/${spotId}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
