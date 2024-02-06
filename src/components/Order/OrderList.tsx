import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useGetProductList, ProductRes } from 'src/hooks/useProduct';

import { media } from 'src/style/mediaQuery';

interface OrderItemType {
  orderPrice: any;
  data: ProductRes;
  orderQuantity: number;
}

export interface OrderListProps {
  orderList: number[] | undefined;
  orderQuantity: number[] | undefined;
  orderPrice: number[] | undefined;
  totalPrice: number | undefined;
}

const OrderList = ({ orderList, orderQuantity, orderPrice, totalPrice }: OrderListProps) => {
  const [productIds, setProductIds] = useState<number[] | undefined>(orderList);
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);

  useEffect(() => {
    if (orderList && orderQuantity) {
      const ids = orderList.map((item) => item);
      setProductIds(ids);
    }
  }, [orderList, orderQuantity]);

  const { data, isLoading } = useGetProductList(productIds);

  useEffect(() => {
    if (orderQuantity && orderPrice && data?.length > 0) {
      const items = data?.map((orderItem, index) => ({
        data: orderItem,
        orderQuantity: orderQuantity[index],
        orderPrice: orderPrice[index],
      }));

      setOrderItems(items);
    }
  }, [isLoading]);

  if (!orderList || !productIds || isLoading || !orderQuantity || !totalPrice) {
    return null;
  }

  return (
    <OrderListLayout>
      <h2>주문 내용</h2>
      <OrderListCol role='columnheader'>
        <span>상품정보</span>
        <span>할인</span>
        <span>배송비</span>
        <span>상품 금액</span>
      </OrderListCol>
      <OrderListBox>
        <h2 className='a11y-hidden'>주문 내역</h2>
        {orderItems.map((orderItem, i) => (
          <OrderItem key={orderItem.data?.product_id}>
            <OrderItemInfo>
              <img src={orderItem.data.image} alt='상품 이미지' />
              <div>
                <h3 className='a11y-hidden'>상품 정보</h3>
                <p>{orderItem.data.store_name}</p>
                <strong>{orderItem.data.product_name}</strong>
                <p>수량 : {orderItem.orderQuantity}개</p>
              </div>
            </OrderItemInfo>
            <OrderItemAmount>
              <h3>할인</h3>
              <p>-</p>
            </OrderItemAmount>
            <OrderItemAmount>
              <h3>배송비</h3>
              <p>{orderItem.data.shipping_fee ? `${orderItem.data.shipping_fee?.toLocaleString()}원` : `무료배송`}</p>
            </OrderItemAmount>
            <OrderItemAmount>
              <h3>상품 금액</h3>
              <strong>{orderItem.orderPrice?.toLocaleString()}원</strong>
            </OrderItemAmount>
          </OrderItem>
        ))}
      </OrderListBox>
      <OrderTotal>
        <p>
          총 주문금액<strong>{totalPrice.toLocaleString()}원</strong>
        </p>
      </OrderTotal>
    </OrderListLayout>
  );
};

const OrderListLayout = styled.section`
  width: 100%;
  margin-bottom: 60px;
`;

const OrderListCol = styled.div`
  height: 60px;
  display: flex;
  ${media.tablet(`
     display:none
      `)}

  align-items: center;
  margin-bottom: 16px;
  border-radius: 10px;
  background-color: var(--sub-background-color);
  text-align: center;
  span {
    flex: 1;
  }
  span:first-child {
    flex: 3;
  }
`;

const OrderListBox = styled.ul`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OrderItem = styled.li`
  padding: 8px 8px 18px;
  height: 130px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  ${media.tablet(`  
    height: 100%;
    border-radius: 10px;
    border:1px solid var(--border-color);
    padding:20px;

    flex-direction: column;  
    align-items: stretch;

      `)}

  div {
  }

  img {
    width: 104px;
    height: 104px;
    border-radius: 10px;
    margin-right: 36px;
    object-fit: cover;
    aspect-ratio: 1/1;
    object-position: 0 0;
    box-shadow: 0px 1px 2px 0px rgba(118, 118, 118, 0.25);
  }

  h3,
  strong {
    font-weight: 700;
    color: var(--font-color);
  }

  h3 {
    display: none;
    margin: 6px 0 10px;
    ${media.tablet(`  
     display: block;
      `)}
  }
`;

const OrderItemInfo = styled.div`
  display: flex;
  flex: 3;
  align-items: center;

  div {
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  ${media.tablet(`  
     margin-bottom: 16px;
      `)}
`;
const OrderItemAmount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: var(--font-md);
  color: var(--sub-font-color);
  ${media.tablet(`  
     justify-content: space-between;
      `)}
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: var(--font-md);
  strong {
    margin-left: 10px;
    font-weight: 700;
    font-size: var(--font-lg);
    color: var(--error-color);
  }
`;

export default OrderList;
