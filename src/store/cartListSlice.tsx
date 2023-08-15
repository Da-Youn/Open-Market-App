import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/api/axiosInstance';

interface CartItem {
  count: number;
  next: string | null;
  previous: string | null;
  results: [];
}

interface CartListState {
  cartListData: CartItem | null;
  error: null | any;
  loading: boolean;
}

const initialState: CartListState = {
  cartListData: null,
  error: null,
  loading: false,
};

export const getCartListData = createAsyncThunk<CartItem>(
  'cart/getCartList',
  async () => {
    const res = await api.get('/cart/');
    return res.data;
  },
);

const cartListSlice = createSlice({
  name: 'cartList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartListData.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        getCartListData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.error = null;
          state.loading = false;
          state.cartListData = action.payload;
        },
      )
      .addCase(
        getCartListData.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        },
      );
  },
});

export const cartListAction = cartListSlice.actions;
export default cartListSlice.reducer;
