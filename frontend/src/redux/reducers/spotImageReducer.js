import { createSlice } from '@reduxjs/toolkit';
import { uploadImage, deleteImage } from '../actions/spotImageActions';

const spotImagesSlice = createSlice({
  name: 'spotImages',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        return state.filter(image => image.id !== action.payload);
      });
  },
});

export default spotImagesSlice.reducer;
