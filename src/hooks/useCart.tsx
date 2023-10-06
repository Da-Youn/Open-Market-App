import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import {
  axiosInstance,
  urlInstance,
  userInstance,
} from 'src/api/axiosInstance';

interface ErrorResponse {
  FAIL_message: string;
  // 다른 필요한 속성들도 추가할 수 있습니다.
}

interface ApiResponse<T> {
  map: any;
  data: T;
  length: number;
  forEach(arg0: (item: CartResTypes) => void): unknown;
}

export interface CartReqTypes {
  product_id: number;
  quantity: number;
  is_active: boolean; // 장바구니 내 상품 활성화 버튼, 같이 보내지 않으면 False
}

export interface CartResTypes {
  my_cart?: number;
  cart_item_id?: number;
  product_id?: number;
  quantity?: number;
}

export const usePostCart = () => {
  const queryClient = useQueryClient();

  const addCart = async (data: CartReqTypes) => {
    const res = await userInstance.post<ApiResponse<CartResTypes>>(
      `/cart/`,
      data,
    );
    return res.data;
  };

  return useMutation(async (data: CartReqTypes) => addCart(data), {
    onSuccess: (data) => {
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
  const getCart = async (): Promise<ApiResponse<CartResTypes>> => {
    const res = await userInstance.get(`/cart/`);
    return res.data.results;
  };

  const { data, isLoading } = useQuery(['cart'], () => getCart());

  return {
    cartData: data,
    isCartListLoading: isLoading,
  };
};
