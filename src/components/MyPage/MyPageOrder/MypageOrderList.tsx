import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { OrderResult } from 'src/hooks/useOrder';
import { useGetProducts, useGetProduct } from 'src/hooks/useProduct';

import MypageOrderItem from './MypageOrderItem';

import RightArrowIcon from 'src/assets/icon-right-arrow.svg';

export interface MypageOrderItemProps {
  order: OrderResult;
}

const MypageOrderList = ({ order }: MypageOrderItemProps) => {
  const { productsData, isLoading } = useGetProducts(order.order_items);

  return (
    <MypageOrderListLayout>
      <OrderListInfoBox>
        <OrderDate>2020. 20. 20</OrderDate>
        <Link to=''>
          주문 상세 <img src={RightArrowIcon} alt='화살표 아이콘' />
        </Link>
      </OrderListInfoBox>

      {productsData.map((item, index) => {
        return (
          <MypageOrderItem
            key={index}
            item={item}
            quantity={order.order_quantity[index]}
            deliveryStatus={order?.delivery_status}
          />
        );
      })}
    </MypageOrderListLayout>
  );
};

const MypageOrderListLayout = styled.ul`
  background-color: var(--white);
  width: 100%;
  border-radius: 10px;
  padding: 20px 25px;
`;

const OrderListInfoBox = styled.div`
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-size: var(--font-xs);
    display: flex;
    align-items: center;
    img {
      width: 20px;
    }
  }
`;

const OrderDate = styled.p`
  font-weight: 700;
`;

export default MypageOrderList;
