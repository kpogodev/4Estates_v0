import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from '../features/properties/propertiesSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    auth: authReducer,
  },
});
