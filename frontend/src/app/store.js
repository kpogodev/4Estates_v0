import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from 'context/properties/propertiesSlice'
import authReducer from 'context/auth/authSlice'
import profilesReducer from 'context/profiles/profilesSlice'
import appReducer from 'context/app/appSlice'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    auth: authReducer,
    profiles: profilesReducer,
    app: appReducer,
  },
})
