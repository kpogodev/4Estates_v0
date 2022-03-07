import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profilesService from './profilesServices';

const initialState = {
  profile: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
};

// Get My Profile
export const getMyProfile = createAsyncThunk('profiles/get_me', async (payload, thunkAPI) => {
  try {
    return await profilesService.getMyProfile();
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    resetState: (state) => {
      state.profile = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.profile = action.payload.data;
        state.isLoading = false;
        state.isSuccess = action.payload.success;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.profile = null;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = profilesSlice.actions;
export default profilesSlice.reducer;
