import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../api'; 

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (spotId, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/spots/${spotId}/reviews`); 
    if (response.ok) {
      const data = await response.json();
      return data.Reviews;
    } else {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const createReview = createAsyncThunk('reviews/createReview', async ({ spotId, review }, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/spots/${spotId}/reviews`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
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

export const deleteReview = createAsyncThunk('reviews/deleteReview', async (reviewId, thunkAPI) => {
  try {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, { 
      method: 'DELETE',
    });
    if (response.ok) {
      return reviewId;
    } else {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
