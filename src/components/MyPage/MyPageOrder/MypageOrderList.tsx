import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { media } from 'src/style/mediaQuery';
import { OrderResult } from 'src/hooks/useOrder';
import { useGetProductList, useGetProduct } from 'src/hooks/useProduct';

import MypageOrderItem from './MypageOrderItem';
import { formatDateString } from 'src/util/formatDateString';

import RightArrowIcon from 'src/assets/icon-right-arrow.svg';

export interface MypageOrderItemProps {
  order: OrderResult;
}

const MypageOrderList = ({ order }: MypageOrderItemProps) => {
  const { data, isLoading } = useGetProductList(order.order_items);

  if (!data && isLoading) return null;

  return (
    <MypageOrderListLayout>
      <OrderListInfoBox>
        <OrderDate>{formatDateString(order?.created_at)}</OrderDate>
        <Link to=''>
          주문 상세 <img src={RightArrowIcon} alt='화살표 아이콘' />
        </Link>
      </OrderListInfoBox>

      {data.map((item, index) => {
        return (
          <MypageOrderItem
            key={index}
            item={item}
            quantity={order?.order_quantity[index]}
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
  padding: 20px;
  ${media.mobile(`
    padding: 15px;
      `)}
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
