import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSpots = createAsyncThunk('spots/fetchSpots', async (_, thunkAPI) => {
  try {
    const response = await fetch('/api/spots');
    if (response.ok) {
      const data = await response.json();
      return data.Spots;
    } else {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const createSpot = createAsyncThunk('spots/createSpot', async (spot, thunkAPI) => {
  try {
    const response = await fetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spot),
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
