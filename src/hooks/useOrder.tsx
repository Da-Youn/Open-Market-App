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
  results: OrderRes[];
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
  order_items: number[];
  order_quantity: number[];
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

const initialOrderState: OrderRes | undefined = undefined;

export const useGetOrder = () => {
  const [orderData, setOrderData] = useState<OrderRes | undefined>(
    initialOrderState,
  );

  const getProduct = async (): Promise<OrderRes> => {
    const res = await userInstance.get(`/order/`);
    return res.data.results[0];
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
