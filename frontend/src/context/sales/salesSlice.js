import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import salesService from './salesServices'

const initialState = {
  sales: [],
  sales_count: 0,
  sale: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Get rents
export const getSales = createAsyncThunk('rents/get_sales', async (payload, thunkAPI) => {
  try {
    return await salesService.getSales(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get sale
export const getSale = createAsyncThunk('sales/get_sale', async (payload, thunkAPI) => {
  try {
    return await salesService.getSale(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Add sale
export const addSale = createAsyncThunk('sales/add_sale', async (payload, thunkAPI) => {
  try {
    return await salesService.addSale(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Remove sale
export const removeSale = createAsyncThunk('sales/remove_sale', async (payload, thunkAPI) => {
  try {
    return await salesService.removeSale(payload)
  } catch (error) {
    const message = error?.response?.data?.message ?? error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const salesSlice = createSlice({
  name: 'sale',
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
    resetSale: (state) => {
      state.sale = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSale.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.isLoading = false
        state.sale = action.payload.data
        state.isSuccess = action.payload.success
      })
      .addCase(addSale.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSale.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSale.fulfilled, (state, action) => {
        state.isLoading = false
        state.sale = action.payload.data
        state.isSuccess = action.payload.success
      })
      .addCase(getSale.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeSale.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeSale.fulfilled, (state, action) => {
        state.isLoading = false
        state.sale = null
        state.isSuccess = action.payload.success
      })
      .addCase(removeSale.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

// Selectors
export const selectAllSales = (state) => state.sales.sales
export const selectSalesCount = (state) => state.sales.sales_count
export const selectSalesIsError = (state) => state.sales.isError
export const selectSalesIsLoading = (state) => state.sales.isLoading
export const selectSalesIsSuccess = (state) => state.sales.isSuccess
export const selectSalesMessage = (state) => state.sales.message
export const selectSale = (state) => state.sales.sale

export const { reset, resetError, resetSuccess, resetSale } = salesSlice.actions
export default salesSlice.reducer
