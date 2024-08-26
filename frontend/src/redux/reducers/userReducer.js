import { createReducer } from '@reduxjs/toolkit';
import { loginUser, logout } from '../actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
});

export default userReducer;
