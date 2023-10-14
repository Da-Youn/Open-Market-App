import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  axiosInstance,
  urlInstance,
  userInstance,
} from 'src/api/axiosInstance';

interface ApiResponse<T> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
}

interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface OrderReq {
  product_id?: number;
  quantity?: number;
  order_kind: string;
  receiver: string;
  receiver_phone_number: string;
  address: string;
  address_message: string;
  payment_method: string;
  total_price: number;
}
interface OrderRes {
  buyer: number;
  order_number: number;
  order_items: OrderItem[];
  receiver: string;
  receiver_phone_number: string;
  address: string;
  address_message: string;
  payment_method: string;
  total_price: number;
}

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  const createOrder = async (data: OrderReq) => {
    const res = await userInstance.post<ApiResponse<OrderRes>>(`/order/`, data);
    console.log(res);
    return res;
  };

  return useMutation((data: OrderReq) => createOrder(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('order');
    },
    onError: (error: any) => {
      throw error;
    },
  });
};

const initialOrderState: ApiResponse<OrderRes> = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export const useGetOrder = () => {
  const [orderData, setOrderData] =
    useState<ApiResponse<OrderRes>>(initialOrderState);

  const getProduct = async (): Promise<ApiResponse<OrderRes>> => {
    const res = await userInstance.get(`/order/`);
    return res.data;
  };

  const { isLoading } = useQuery(['order'], () => getProduct(), {
    onSuccess: (data) => {
      setOrderData(data);
    },
  });

  return {
    orderData,
    isOrderLoading: isLoading,
  };
};
