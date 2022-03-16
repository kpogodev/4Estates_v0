import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import propertiesService from './propertiesService'

const initialState = {
  properties: [],
  myProperties: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
}

export const getProperties = createAsyncThunk('properties/get', async (payload, thunkAPI) => {
  try {
    return await propertiesService.getProperties(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getMyProperties = createAsyncThunk('properties/get_my', async (payload, thunkAPI) => {
  try {
    return await propertiesService.getProperties(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    reset: (state) => {
      state.properties = []
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
      .addCase(getProperties.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.properties = action.payload.data
        state.isLoading = false
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.properties = []
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMyProperties.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyProperties.fulfilled, (state, action) => {
        state.myProperties = action.payload.data
        state.isLoading = false
      })
      .addCase(getMyProperties.rejected, (state, action) => {
        state.myProperties = []
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, resetError, resetSuccess } = propertiesSlice.actions
export default propertiesSlice.reducer
