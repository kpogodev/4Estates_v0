import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from 'redux/properties/propertiesSlice'
import authReducer from 'redux/auth/authSlice'
import profilesReducer from 'redux/profiles/profilesSlice'
import appReducer from 'redux/app/appSlice'
import rentsReducer from 'redux/rents/rentsSlice'
import salesReducer from 'redux/sales/salesSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    properties: propertiesReducer,
    profiles: profilesReducer,
    rents: rentsReducer,
    sales: salesReducer,
  },
})
