import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { urlApi } from 'src/api/axiosInstance';

interface ProductData {
  product_id: number;
  created_at: string;
  updated_at: string;
  image: string;
  product_name: string;
  price: number;
  shipping_method: string;
  shipping_fee: number;
  stock: string;
  products_info: string;
  seller: number;
  store_name: string;
}

interface ProductState {
  productData: ProductData | null;
  error: null | any;
  loading: boolean;
}

const initialProductState: ProductState = {
  productData: null,
  error: null,
  loading: false,
};

export const getProductData = createAsyncThunk<ProductData, number>(
  '/product/getProduct',
  async (postId) => {
    const res = await urlApi.get(`/products/${postId}/`);
    return res.data;
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    setProductData: (state, action: PayloadAction<any>) => {
      // state의 타입과 action.payload의 타입이 일치해야 함
      state.productData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductData.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        getProductData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.error = null;
          state.loading = false;
          state.productData = action.payload;
        },
      )
      .addCase(getProductData.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;
