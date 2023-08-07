import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';

const store = configureStore({
  reducer: {
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
