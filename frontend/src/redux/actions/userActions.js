import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('user/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await fetch('/api/session', { method: 'DELETE' });
    localStorage.removeItem('user'); 
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
