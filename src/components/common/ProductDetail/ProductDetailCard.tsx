import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from 'src/store/productSlice';
import { RootState } from 'src/store/store';

export interface ProductDetailCardProps {}

const ProductDetailCard: React.FC<ProductDetailCardProps> = () => {
  const location = useLocation();
  const postId = location.state.toString();
  const dispatch = useDispatch<any>();

  const productData = useSelector(
    (state: RootState) => state.product.productData,
  );

  useEffect(() => {
    dispatch(getProductData(postId)); // createAsyncThunk로 비동기 요청 수행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    </>
  );
};
