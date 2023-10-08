import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  axiosInstance,
  urlInstance,
  userInstance,
} from 'src/api/axiosInstance';

export interface ProductTypes {
  product_id: number;
  created_at: string;
  updated_at: string;
  image: string;
  product_name: string;
  price: number;
  shipping_method: string;
  shipping_fee: number;
  stock: number;
  products_info: string;
  seller: number;
  store_name: string;
}

const initialProductState: ProductTypes = {
  product_id: 0,
  created_at: '',
  updated_at: '',
  image: '',
  product_name: '',
  price: 0,
  shipping_method: '',
  shipping_fee: 0,
  stock: 0,
  products_info: '',
  seller: 0,
  store_name: '',
};

export const useGetProduct = (product_id: number) => {
  const [productData, setProductData] =
    useState<ProductTypes>(initialProductState);
  const getProduct = async (product_id: number): Promise<ProductTypes> => {
    const res = await urlInstance.get(`/products/${product_id}/`);
    return res.data;
  };

  const { isLoading } = useQuery(
    ['product', product_id],
    () => getProduct(product_id),
    {
      onSuccess: (data) => {
        setProductData(data);
      },
    },
  );

  const isProductLoading = isLoading || productData === initialProductState;

  return {
    productData: productData,
    isproductLoading: isProductLoading,
  };
};
