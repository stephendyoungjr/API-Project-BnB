
import { createAsyncThunk } from '@reduxjs/toolkit';


export const uploadImage = createAsyncThunk('spotImages/uploadImage', async ({ spotId, image }, thunkAPI) => {
  try {
    const response = await fetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: image, 
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


export const deleteImage = createAsyncThunk('spotImages/deleteImage', async (imageId, thunkAPI) => {
  try {
    const response = await fetch(`/api/spot-images/${imageId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return imageId;
    } else {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
