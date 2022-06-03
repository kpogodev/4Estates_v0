import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import rentsService from './rentsServices'

const initialState = {
  rents: [],
  rents_count: 0,
  rental: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Get rents
export const getRents = createAsyncThunk('rents/get_rents', async (payload, thunkAPI) => {
  try {
    return await rentsService.getRents(payload)
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

// Add rental
export const addRental = createAsyncThunk('rents/add_rental', async (payload, thunkAPI) => {
  try {
    return await rentsService.addRental(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Remove rental
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
    resetRental: (state) => {
      state.rental = null
    },
    resetRents: (state) => {
      state.rents = []
      state.rents_count = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRental.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addRental.fulfilled, (state, action) => {
        state.isLoading = false
        state.rental = action.payload.data
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
      .addCase(getRents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRents.fulfilled, (state, action) => {
        state.rents = action.payload.data
        state.rents_count = action.payload.count
        state.isLoading = false
        state.isSuccess = action.payload.success
      })
      .addCase(getRents.rejected, (state, action) => {
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

// Selectors
export const selectAllRents = (state) => state.rents.rents
export const selectRentsCount = (state) => state.rents.rents_count
export const selectRentsIsError = (state) => state.rents.isError
export const selectRentsIsLoading = (state) => state.rents.isLoading
export const selectRentsIsSuccess = (state) => state.rents.isSuccess
export const selectRentsMessage = (state) => state.rents.message
export const selectRental = (state) => state.rents.rental

export const selectRentsMarkers = (state) => {
  return state.rents.rents.map((item) => ({ id: item._id, coordinates: item.property.location.coordinates }))
}

export const selectRentsByPremiumAndDate = (state) => {
  const rentsByDate = state.rents.rents.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return rentsByDate.slice().sort((a, b) => b.publisher.is_premium.active - a.publisher.is_premium.active)
}

//Memoized Selectors
export const selectRentByMarker = createSelector([selectAllRents, (state, id) => id], (rents, id) => rents.find((rent) => rent._id === id))

export const selectRentsSorted = createSelector([selectAllRents], (rents) => {
  const rentsByDate = rents.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return rentsByDate.slice().sort((a, b) => b.publisher.is_premium.active - a.publisher.is_premium.active)
})

export const { reset, resetError, resetSuccess, resetRental, resetRents } = rentsSlice.actions
export default rentsSlice.reducer
