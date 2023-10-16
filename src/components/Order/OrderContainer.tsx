import styled from 'styled-components';

import { useGetOrder } from 'src/hooks/useOrder';
import { useLocation } from 'react-router-dom';

import OrderList from './OrderList';
import OrderForm from './OrderForm';
import PaymentForm from './PaymentForm';

import Button from '../common/Button';
import CheckBoxIcon from '../../assets/check-box.svg';
import CheckFillBoxIcon from '../../assets/check-fill-box.svg';

const OrderContainer = () => {
  const { orderData, isOrderLoading } = useGetOrder();
  console.log(orderData);

  return (
    <OrderLayout>
      <h1>주문 / 결제하기</h1>
      <OrderList />
      <OrderForm />
      <PaymentForm />
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
