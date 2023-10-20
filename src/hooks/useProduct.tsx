import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  axiosInstance,
  urlInstance,
  userInstance,
} from 'src/api/axiosInstance';

export interface Product {
  map(
    arg0: (product: any) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode;
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

export const useGetProducts = (productIds: number[] | undefined) => {
  const getProduct = async (productId: number): Promise<Product> => {
    const res = await urlInstance.get(`/products/${productId}/`);
    return res.data;
  };

  const { data: productsData = [], isLoading } = useQuery(
    ['products', productIds],
    async () => {
      if (productIds === undefined) {
        return [];
      }
      return Promise.all(productIds.map((productId) => getProduct(productId)));
    },
  );

  return {
    productsData,
    isLoading,
  };
};
export const useGetSellerProducts = () => {
  const getProduct = async (): Promise<Product> => {
    const res = await userInstance.get(`/seller/`);
    return res.data.results;
  };

  const { data, isLoading } = useQuery(['seller'], () => getProduct());

  return {
    productsData: data,
    isLoading: isLoading,
  };
};
