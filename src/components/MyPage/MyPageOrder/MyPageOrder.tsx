import styled from 'styled-components';

import { useGetOrder, OrderResult } from 'src/hooks/useOrder';
import { useGetProducts } from 'src/hooks/useProduct';

import MypageOrderList from './MypageOrderList';

export interface MyPageOrderTableProps {}

const MyPageOrder = (props: MyPageOrderTableProps) => {
  const { orderData, isOrderLoading } = useGetOrder();

  if (!orderData || isOrderLoading) return;

  return (
    <MyPageOrderLayout>
      <MyPageOrderBox>
        {orderData.results.map((order: OrderResult) => {
          if (order.order_items.length > 0) {
            return (
              <MypageOrderList
                key={order.order_number}
                order={order}
              ></MypageOrderList>
            );
          }
        })}
      </MyPageOrderBox>
    </MyPageOrderLayout>
  );
};

const MyPageOrderLayout = styled.section`
  width: 100%;
  padding: 10px;
  border-radius: 10px;

  background-color: var(--sub-color);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MyPageOrderBox = styled.ul`
  width: 100%;
  min-width: 330px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default MyPageOrder;
