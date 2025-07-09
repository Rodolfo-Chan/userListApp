import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Tipado para hooks personalizados
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
