import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import propertiesService from './propertiesService'

const initialState = {
  properties: [],
  myProperties: [],
  property: null,
  myProperty: null,
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

export const getProperty = createAsyncThunk('properties/get_property', async (payload, thunkAPI) => {
  try {
    return await propertiesService.getProperty(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getMyProperties = createAsyncThunk('properties/get_my_properties', async (payload, thunkAPI) => {
  try {
    return await propertiesService.getProperties(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const addProperty = createAsyncThunk('properties/add', async (payload, thunkAPI) => {
  try {
    return await propertiesService.addProperty(payload)
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
      state.myProperties = []
      state.property = null
      state.myProperty = null
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
    resetMyProperty: (state) => {
      state.myProperty = null
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
      .addCase(getProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.myProperty = action.payload.data
        state.isLoading = false
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.myProperty = null
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
      })
      .addCase(addProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.property = action.payload.data
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = `Your property on ${action.payload.data.location.street} has been added`
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.property = null
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, resetError, resetSuccess, resetMyProperty } = propertiesSlice.actions
export default propertiesSlice.reducer
