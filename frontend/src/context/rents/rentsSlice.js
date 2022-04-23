import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import rentsService from './rentsServices'

const initialState = {
  rents: [],
  rental: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}
// Add rental
export const addRental = createAsyncThunk('rents/add_rental', async (payload, thunkAPI) => {
  try {
    return await rentsService.addRental(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get rental
export const getRental = createAsyncThunk('rents/get_rental', async (payload, thunkAPI) => {
  try {
    return await rentsService.getRental(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get rental
export const removeRental = createAsyncThunk('rents/remove_rental', async (payload, thunkAPI) => {
  try {
    return await rentsService.removeRental(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const rentsSlice = createSlice({
  name: 'rents',
  initialState,
  reducers: {
    reset: (state) => {
      state.rents = []
      state.rental = null
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
      .addCase(addRental.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addRental.fulfilled, (state, action) => {
        state.isLoading = false
        state.rents = [...state.rents, action.payload.data]
        state.isSuccess = action.payload.success
      })
      .addCase(addRental.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRental.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRental.fulfilled, (state, action) => {
        state.isLoading = false
        state.rental = action.payload.data
        state.isSuccess = action.payload.success
      })
      .addCase(getRental.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeRental.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeRental.fulfilled, (state, action) => {
        state.isLoading = false
        state.rental = null
        state.isSuccess = action.payload.success
      })
      .addCase(removeRental.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, resetError, resetSuccess } = rentsSlice.actions
export default rentsSlice.reducer
