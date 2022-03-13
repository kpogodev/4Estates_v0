import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import profilesService from './profilesServices'

const initialState = {
  profile: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Get My Profile
export const getMyProfile = createAsyncThunk('profiles/get_me', async (payload, thunkAPI) => {
  try {
    return await profilesService.getMyProfile()
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update My Profile
export const updateProfile = createAsyncThunk('profiles/update', async (payload, thunkAPI) => {
  try {
    return await profilesService.updateProfile(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    reset: (state) => {
      state.profile = null
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
      state.message = ''
    },
    resetError: (state) => {
      state.isError = false
      state.message = ''
    },
    resetSuccess: (state) => {
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload.data
        state.isSuccess = action.payload.success
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload.data
        state.isLoading = false
        state.isSuccess = action.payload.success
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, resetError, resetSuccess } = profilesSlice.actions
export default profilesSlice.reducer
