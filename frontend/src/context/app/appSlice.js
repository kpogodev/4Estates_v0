import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  googleServicesLoaded: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    googleServicesLoaded: (state) => {
      state.googleServicesLoaded = true
    },
  },
})

export const { googleServicesLoaded } = appSlice.actions
export default appSlice.reducer
