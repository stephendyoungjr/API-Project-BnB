import { createSlice } from '@reduxjs/toolkit';
import { fetchSpots, createSpot } from '../actions/spotActions';

const spotsSlice = createSlice({
  name: 'spots',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpots.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createSpot.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default spotsSlice.reducer;
