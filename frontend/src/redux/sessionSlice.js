
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const login = createAsyncThunk('session/login', async (user) => {
  return await api.login(user.credential, user.password);
});

export const signup = createAsyncThunk('session/signup', async (user) => {
  return await api.signup(user);
});

const sessionSlice = createSlice({
  name: 'session',
  initialState: { user: null },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { logout } = sessionSlice.actions;
export default sessionSlice.reducer;
