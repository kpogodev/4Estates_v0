import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  isAuth: false,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
};

// Login User
export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    return await authService.loginUser(payload);
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = action.payload.success;
        state.isSuccess = action.payload.success;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
