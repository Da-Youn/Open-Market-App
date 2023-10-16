import styled from 'styled-components';

export interface OrderListProps {}

const OrderList = (props: OrderListProps) => {
  return (
    <OrderListLayout>
      <OrderListCol role='columnheader'>
        <span>상품정보</span>
        <span>할인</span>
        <span>배송비</span>
        <span>상품 금액</span>
      </OrderListCol>
      <OrderListBox>
        <h2 className='a11y-hidden'>주문 내역</h2>
        <OrderItem>
          <div>
            <img src='' alt='' />
            <div>
              <p>백엔드글로벌</p>
              <h3>딥러닝 개발자 무릎 담요</h3>
              <p>수량 : 1개</p>
            </div>
          </div>
          <div>-</div>
          <div>무료배송</div>
          <div>
            <strong>17,500원</strong>
          </div>
        </OrderItem>
      </OrderListBox>
      <OrderTotal>
        <p>
          총 주문금액<strong>46,500원</strong>
        </p>
      </OrderTotal>
    </OrderListLayout>
  );
};

const OrderListLayout = styled.section`
  width: 100%;
  margin-bottom: 96px;
`;

const OrderListCol = styled.div`
  height: 60px;
  display: flex;

  align-items: center;
  margin-bottom: 16px;
  border-radius: 10px;
  background-color: var(--sub-color);
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
`;

const OrderItem = styled.li`
  padding: 8px 8px 18px;
  height: 130px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);

  div {
    display: flex;
    justify-content: center;
    flex: 1;
    font-size: var(--font-md);
    color: var(--sub-font-color);
  }
  div:first-child {
    flex: 3;
    align-items: center;
    div {
      display: block;
    }
  }

  img {
    width: 104px;
    height: 104px;
    border-radius: 10px;
    margin-right: 36px;
    object-fit: cover;
    aspect-ratio: 1/1;
    object-position: 50% 0;
  }

  h3,
  strong {
    font-weight: 700;
    color: var(--font-color);
  }

  h3 {
    margin: 6px 0 10px;
  }

  p {
    font-size: var(--font-xs);
  }
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
