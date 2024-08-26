import { createAsyncThunk } from '@reduxjs/toolkit';

export const uploadSpotImage = createAsyncThunk('spotImages/uploadSpotImage', async ({ spotId, image }, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: formData,
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
