import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import OrderList from './OrderList';
import OrderForm from './OrderForm';
import PaymentForm from './PaymentForm';

const OrderContainer = () => {
  const location = useLocation();
  const state = location.state;
  const data = state.data;
  const orderType = state.order;
  const [orderData, setOrderData] = useState(
    orderType === 'cart_order'
      ? {
          order_kind: orderType,
          receiver: '',
          receiver_phone_number: '',
          address: '',
          address_message: '',
          payment_method: 'CARD',
          total_price: data.total_price,
        }
      : {
          product_id: data.order_items,
          quantity: data.order_quantity,
          order_kind: orderType,
          receiver: '',
          receiver_phone_number: '',
          address: '',
          address_message: '',
          payment_method: 'CARD',
          total_price: data.total_price,
        },
  );

  let orderList, orderQuantity, orderPrice, shipFee, totalPrice;

  if (!data) {
    return null;
  }
  orderList = data.order_items?.length ? data?.order_items : [data?.order_items];
  orderQuantity = data.order_quantity?.length ? data?.order_quantity : [data?.order_quantity];
  shipFee = data?.shipping_fee;
  totalPrice = data?.total_price;
  orderPrice = data.price?.length ? data?.price : [data?.price];

  return (
    <OrderLayout>
      <h1>주문 / 결제하기</h1>
      <OrderList orderList={orderList} orderQuantity={orderQuantity} orderPrice={orderPrice} totalPrice={totalPrice} />
      <OrderForm setOrderData={setOrderData} orderType={orderType} />
      <PaymentForm
        orderData={orderData}
        setOrderData={setOrderData}
        totalPrice={totalPrice}
        price={orderPrice}
        shipFee={shipFee}
      />
    </OrderLayout>
  );
};

const OrderLayout = styled.main`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: 54px 30px 0;

  h1 {
    font-size: var(--font-xl);
    font-weight: 700;
    margin-bottom: 52px;
    text-align: center;
  }

  h2 {
    font-size: var(--font-lg);
    padding-bottom: 18px;
    font-weight: 700;
    width: 100%;
  }
`;

export default OrderContainer;
