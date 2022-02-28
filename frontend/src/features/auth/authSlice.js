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

// Logout User
export const logoutUser = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
  try {
    return await authService.logoutUser();
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Check User
export const checkUser = createAsyncThunk('auth/check', async (payload, thunkAPI) => {
  try {
    return await authService.checkUser();
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
    resetError: (state) => {
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
      })
      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isAuth = action.payload.success;
        state.isSuccess = action.payload.success;
        state.isLoading = false;
      })
      .addCase(checkUser.rejected, (state) => {
        state.isAuth = false;
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetError } = authSlice.actions;
export default authSlice.reducer;