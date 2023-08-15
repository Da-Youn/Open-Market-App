import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import cartListSlice from './cartListSlice';
const store = configureStore({
  reducer: {
    product: productSlice,
    cartList: cartListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
