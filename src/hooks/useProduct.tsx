import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { axiosInstance, imgInstance, urlInstance, userInstance } from 'src/api/axiosInstance';

export interface ProductReq {
  product_name: string;
  image?: File | null;
  price: number;
  shipping_method: string;
  shipping_fee: number;
  stock: number;
  product_info: string;
}

export interface ProductRes {
  length: number;
  map(arg0: (product: any) => import('react/jsx-runtime').JSX.Element): import('react').ReactNode;
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
const initialProductState: Partial<ProductRes> = {};

export const useGetProduct = (product_id: number) => {
  const [productData, setProductData] = useState<ProductRes>(initialProductState as ProductRes);
  const getProduct = async (product_id: number): Promise<ProductRes> => {
    const res = await urlInstance.get(`/products/${product_id}/`);
    return res.data;
  };

  const { isLoading } = useQuery(['product', product_id], () => getProduct(product_id), {
    onSuccess: (data) => {
      setProductData(data);
    },
  });

  return {
    productData,
    isProductLoading: isLoading,
  };
};

export const useGetProducts = (productIds: number[] | undefined) => {
  const getProduct = async (productId: number): Promise<ProductRes> => {
    const res = await urlInstance.get(`/products/${productId}/`);
    return res.data;
  };

  const { data: productsData = [], isLoading } = useQuery(['product', productIds], async () => {
    if (productIds === undefined) {
      return [];
    }
    return Promise.all(productIds.map((productId) => getProduct(productId)));
  });

  return {
    productsData,
    isLoading,
  };
};

export const useGetSearchProducts = (keyword: string | null) => {
  const [data, setData] = useState<ProductRes>(initialProductState as ProductRes);
  const getProduct = async (keyword: string | null): Promise<ProductRes> => {
    const res = await urlInstance.get(`/products/?search=${keyword}`);
    return res.data.results;
  };

  const { isLoading } = useQuery(['product', keyword], () => getProduct(keyword), {
    onSuccess: (data) => {
      setData(data);
    },
  });

  return {
    data,
    isLoading,
  };
};

export const useGetSellerProducts = () => {
  const getProduct = async (): Promise<ProductRes> => {
    const res = await userInstance.get(`/seller/`);

    return res.data.results.length ? res.data.results : [];
  };

  const { data, isLoading } = useQuery(['product'], () => getProduct());

  return {
    productsData: data,
    isLoading: isLoading,
  };
};

export const usePostProduct = () => {
  const queryClient = useQueryClient();

  const addProduct = async (data: ProductReq) => {
    const res = await imgInstance.post<ProductReq>(`/products/`, data);
    return res.data;
  };

  return useMutation(async (data: ProductReq) => addProduct(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['product']);
    },
    onError: (error: any) => {
      throw error;
    },
  });
};

export const usePutProduct = (product_id: number) => {
  const queryClient = useQueryClient();

  const editCart = async (data: ProductReq) => {
    const res = await imgInstance.put<ProductReq>(`/products/${product_id}/`, data);
    return res.data;
  };

  return useMutation(async (data: ProductReq) => editCart(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['product']);
    },
    onError: (error: any) => {
      throw error;
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const deleteProduct = async (product_id: number) => {
    const res = await imgInstance.delete(`/products/${product_id}`);
    return res;
  };

  return useMutation(async (product_id: number) => deleteProduct(product_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['product']);
    },
    onError: (error: any) => {
      throw error;
    },
  });
};
