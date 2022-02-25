import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import propertiesService from './propertiesService';

const initialState = {
  properties: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
};

export const getProperties = createAsyncThunk('properties/get', async (payload, thunkAPI) => {
  try {
    return await propertiesService.getProperties();
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    resetState: (state) => {
      state.properties = [];
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success;
        state.properties = action.payload.data;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.properties = [];
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = propertiesSlice.actions;
export default propertiesSlice.reducer;
