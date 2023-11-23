import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { axiosInstance, urlInstance, userInstance } from 'src/api/axiosInstance';

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
export interface OrderResult {
  delivery_status?: string | undefined;
  buyer: number;
  created_at?: string;
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

export interface OrderRes {
  count: number;
  next: null | string;
  previous: null | string;
  results: Array<{
    buyer: number; // 구매자(로그인 된 유저)
    order_number: number; // 주문번호
    order_items: Array<number>; // 구매 상품들
    order_quantity: Array<number>; // 구매 상품들의 수량
    receiver: string; // 받는 사람
    receiver_phone_number: string; // 받는 사람의 핸드폰 번호
    address: string; // 주소
    address_message: string; // 배송 메시지
    payment_method: string; // 결제 방법
    total_price: number; // 결제 금액
  }>;
}

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  const createOrder = async (data: OrderReq) => {
    const res = await userInstance.post<ApiResponse<OrderResult>>(`/order/`, data);
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
  const [orderData, setOrderData] = useState<OrderRes | undefined>(initialOrderState);

  const getProduct = async (): Promise<OrderRes> => {
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
