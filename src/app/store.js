// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlicer';
import itemReducer from '../features/items/itemSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger), // Attach redux-logger
});
