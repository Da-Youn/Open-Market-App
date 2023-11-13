import styled from 'styled-components';

import { useGetOrder } from 'src/hooks/useOrder';

import OrderList from './OrderList';
import OrderForm from './OrderForm';
import PaymentForm from './PaymentForm';

import { useState } from 'react';

const OrderContainer = () => {
  const [price, setPrice] = useState<number[]>([]);
  const [shipFee, setShipFee] = useState<number[]>([]);
  const { orderData: data, isOrderLoading } = useGetOrder();
  const orderData = data?.results[0];
  let orderList, orderQuantity, orderInfo, payment, totalPrice;

  const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (!phoneNumber) {
      return [];
    }

    let formattedNumber: string[] = [];
    const regex1 = /(\d{2})(\d{4})(\d{4})/;
    const regex2 = /(\d{3})(\d{3,4})(\d{4})/;
    if (phoneNumber.length === 10 && phoneNumber.startsWith('02')) {
      formattedNumber = phoneNumber.replace(regex1, '$1,$2,$3').split(',');
    } else if (phoneNumber.length === 10) {
      formattedNumber = phoneNumber.replace(regex2, '$1,$2,$3').split(',');
    } else if (phoneNumber.length === 11 && phoneNumber.startsWith('02')) {
      formattedNumber = phoneNumber.replace(regex1, '$1,$2,$3').split(',');
    } else if (phoneNumber.length === 11) {
      formattedNumber = phoneNumber.replace(regex2, '$1,$2,$3').split(',');
    }
    return formattedNumber;
  };

  if (!isOrderLoading) {
    orderList = orderData?.order_items;
    orderQuantity = orderData?.order_quantity;
    totalPrice = orderData?.total_price;
    orderInfo = {
      receiver: orderData?.receiver,
      phoneNumber: formatPhoneNumber(orderData?.receiver_phone_number),
      address: orderData?.address,
      addressMessage: orderData?.address_message,
      totalPrice: orderData?.total_price,
    };
    payment = orderData?.payment_method;
  }

  return (
    <OrderLayout>
      <h1>주문 / 결제하기</h1>
      <OrderList
        orderList={orderList}
        orderQuantity={orderQuantity}
        totalPrice={totalPrice}
        setPrice={setPrice}
        setShipFee={setShipFee}
      />
      <OrderForm orderInfo={orderInfo} />
      {price && shipFee && (
        <PaymentForm
          payment={payment}
          totalPrice={totalPrice}
          price={price}
          shipFee={shipFee}
        />
      )}
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
