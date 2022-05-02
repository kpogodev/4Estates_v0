import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import propertiesService from './propertiesService'

const initialState = {
  properties: [],
  myProperties: [],
  property: null,
  uploadProgress: 0,
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

export const getMyProperties = createAsyncThunk('properties/get_my_properties', async (payload, thunkAPI) => {
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

export const addProperty = createAsyncThunk('properties/add', async (payload, thunkAPI) => {
  try {
    return await propertiesService.addProperty(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateProperty = createAsyncThunk('properties/update', async (payload, thunkAPI) => {
  try {
    return await propertiesService.updateProperty(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteProperty = createAsyncThunk('properties/delete', async (payload, thunkAPI) => {
  try {
    return await propertiesService.deleteProperty(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const uploadPropertyImages = createAsyncThunk('properties/upload', async (payload, thunkAPI) => {
  try {
    return await propertiesService.uploadPropertyImages(payload, thunkAPI)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deletePropertyImage = createAsyncThunk('properties/upload_delete_img', async (payload, thunkAPI) => {
  try {
    return await propertiesService.deletePropertyImage(payload, thunkAPI)
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
    resetProperty: (state) => {
      state.property = null
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload
    },
    setPropertyIsPublished: (state, action) => {
      state.property.is_published = action.payload
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
        state.property = action.payload.data
        state.isLoading = false
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.property = null
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
        state.myProperties = [...state.myProperties, action.payload.data]
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
      .addCase(updateProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.property = action.payload.data
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = `Property details have been updated`
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.property = null
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(uploadPropertyImages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadPropertyImages.fulfilled, (state, action) => {
        state.property = action.payload.data
        state.isSuccess = action.payload.success
        state.uploadProgress = 0
        state.isLoading = false
        state.message = `Your images have been uploaded`
      })
      .addCase(uploadPropertyImages.rejected, (state, action) => {
        state.property = null
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePropertyImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePropertyImage.fulfilled, (state, action) => {
        state.property = action.payload.data
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = `Your image has been deleted`
      })
      .addCase(deletePropertyImage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.property = null
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = `Your property has been deleted`
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, resetError, resetSuccess, resetProperty, setUploadProgress, setPropertyIsPublished } = propertiesSlice.actions
export default propertiesSlice.reducer
