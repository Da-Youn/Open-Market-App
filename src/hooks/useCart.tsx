import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import {
  axiosInstance,
  urlInstance,
  userInstance,
} from 'src/api/axiosInstance';

interface ApiResponse<T> {
  length: number;
  data: T;
  forEach(arg0: (item: CartListRes) => void): unknown;
  map(
    arg0: (cartItem: any) => import('react/jsx-runtime').JSX.Element,
  ): unknown;
}

interface CartListRes {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartItemRes[];
}

interface CartItemRes {
  my_cart: number;
  cart_item_id: number;
  product_id: number;
  quantity: number;
}

export interface CartReq {
  product_id: number;
  quantity: number;
  check?: boolean;
  is_active?: boolean; // 기본값은 false
}

export const usePostCart = () => {
  const queryClient = useQueryClient();

  const addCart = async (data: CartReq) => {
    const res = await userInstance.post<ApiResponse<CartListRes>>(
      `/cart/`,
      data,
    );
    return res.data;
  };

  return useMutation(async (data: CartReq) => addCart(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error: any) => {
      if (error.response?.status === 406) {
        if (
          error.response.data?.FAIL_message ===
          '현재 재고보다 더 많은 수량을 담을 수 없습니다.'
        ) {
          throw new Error('lackOfStockError');
        } else {
          throw new Error('outOfStockError');
        }
      } else {
        throw error;
      }
    },
  });
};

export const useGetCart = () => {
  const getCart = async (): Promise<ApiResponse<CartListRes>> => {
    const res = await userInstance.get(`/cart/`);
    return res.data.results;
  };

  const { data, isLoading } = useQuery(['cart'], () => getCart());

  return {
    cartList: data,
    isCartListLoading: isLoading,
  };
};

export const usePutCart = (cart_item_id: number) => {
  const queryClient = useQueryClient();

  const editCart = async (data: CartReq) => {
    const res = await userInstance.put<CartReq>(`/cart/${cart_item_id}/`, data);
    return res;
  };

  return useMutation((data: CartReq) => editCart(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error: any) => {
      throw error;
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  const deleteCart = async (cart_item_id: number) => {
    const res = await userInstance.delete(`/cart/${cart_item_id}`);

    return res;
  };

  return useMutation((cart_item_id: number) => deleteCart(cart_item_id), {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
    onError: (error: any) => {
      throw error;
    },
  });
};
