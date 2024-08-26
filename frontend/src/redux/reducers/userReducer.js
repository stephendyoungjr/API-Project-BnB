import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logout } from '../actions/userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(logout.fulfilled, () => {
        return null;
      });
  },
});

export default userSlice.reducer;
