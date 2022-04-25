import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from 'context/properties/propertiesSlice'
import authReducer from 'context/auth/authSlice'
import profilesReducer from 'context/profiles/profilesSlice'
import appReducer from 'context/app/appSlice'
import rentsReducer from 'context/rents/rentsSlice'
import salesReducer from 'context/sales/salesSlice'

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
