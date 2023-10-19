import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  axiosInstance,
  urlInstance,
  userInstance,
} from 'src/api/axiosInstance';

export interface Product {
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
const initialProductState: Partial<Product> = {};

export const useGetProduct = (product_id: number) => {
  const [productData, setProductData] = useState<Product>(
    initialProductState as Product,
  );
  const getProduct = async (product_id: number): Promise<Product> => {
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

  return {
    productData,
    isProductLoading: isLoading,
  };
};
