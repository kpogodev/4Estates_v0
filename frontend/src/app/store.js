import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from '../features/properties/propertiesSlice'
import authReducer from '../features/auth/authSlice'
import profilesReducer from '../features/profiles/profilesSlice'
import appReducer from '../features/app/appSlice'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    auth: authReducer,
    profiles: profilesReducer,
    app: appReducer,
  },
})
