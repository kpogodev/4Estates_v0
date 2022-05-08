import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  user: null,
  isAuth: false,
  isSuccess: false,
  isLoading: true,
  isError: false,
  message: '',
}

// Login User
export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    return await authService.loginUser(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Logout User
export const logoutUser = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
  try {
    return await authService.logoutUser()
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get User
export const getUser = createAsyncThunk('auth/get_user', async (payload, thunkAPI) => {
  try {
    return await authService.getUser()
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()

    if (error.response.status === 401) {
      console.clear()
    }

    return thunkAPI.rejectWithValue(message)
  }
})

// Register User
export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    return await authService.registerUser(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Recover Password
export const recoverPassword = createAsyncThunk('auth/recover_password', async (payload, thunkAPI) => {
  try {
    return await authService.recoverPassword(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Reset Password
export const resetPassword = createAsyncThunk('auth/reset_password', async (payload, thunkAPI) => {
  try {
    return await authService.resetPassword(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Upload Avatar
export const uploadAvatar = createAsyncThunk('auth/upload_avatar', async (payload, thunkAPI) => {
  try {
    return await authService.uploadAvatar(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Add Premium
export const addPremium = createAsyncThunk('auth/add_premium', async (payload, thunkAPI) => {
  try {
    return await authService.addPremium(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update Premium
export const updatePremium = createAsyncThunk('auth/update_premium', async (payload, thunkAPI) => {
  try {
    return await authService.updatePremium(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Cancel Premium
export const cancelPremium = createAsyncThunk('auth/cancel_premium', async (_, thunkAPI) => {
  try {
    return await authService.cancelPremium()
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
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
      //Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isAuth = action.payload.success
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = 'You have been logged in'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isAuth = action.payload.success
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = 'You have been registered and logged in'
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isAuth = action.payload.success
        state.isLoading = false
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null
        state.isAuth = false
        state.isLoading = false
      })
      //Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuth = false
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Recover Password
      .addCase(recoverPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = action.payload.success
        state.message = action.payload.message
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = action.payload.success
        state.message = action.payload.message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Upload Avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = 'You avatar has been updated'
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Add Premium
      .addCase(addPremium.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addPremium.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = action.payload.message
      })
      .addCase(addPremium.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Update Premium
      .addCase(updatePremium.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePremium.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = action.payload.message
      })
      .addCase(updatePremium.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //Cancel Premium
      .addCase(cancelPremium.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cancelPremium.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.isSuccess = action.payload.success
        state.isLoading = false
        state.message = action.payload.message
      })
      .addCase(cancelPremium.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, resetError, resetSuccess } = authSlice.actions
export default authSlice.reducer
