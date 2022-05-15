import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchParams: {
    lat: null,
    lng: null,
    radius: 2,
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    propertyType: '',
  },
  googleServicesLoaded: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    googleServicesLoaded: (state) => {
      state.googleServicesLoaded = true
    },
    setSearchParams: (state, action) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    },
  },
})

export const { googleServicesLoaded, setSearchParams } = appSlice.actions
export default appSlice.reducer

