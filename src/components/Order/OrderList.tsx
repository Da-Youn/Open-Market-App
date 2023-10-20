import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useGetProducts, Product } from 'src/hooks/useProduct';

interface OrderItemType {
  data: Product;
  orderQuantity: number;
}

export interface OrderListProps {
  orderList: number[] | undefined;
  orderQuantity: number[] | undefined;
  totalPrice: number | undefined;
  setShipFee: React.Dispatch<React.SetStateAction<number[]>>;
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
}

const OrderList = ({
  orderList,
  orderQuantity,
  totalPrice,
  setShipFee,
  setPrice,
}: OrderListProps) => {
  const [productIds, setProductIds] = useState<number[] | undefined>(orderList);
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);

  useEffect(() => {
    if (orderList && orderQuantity) {
      const ids = orderList.map((item) => item);
      setProductIds(ids);
    }
  }, [orderList, orderQuantity]);

  const { productsData, isLoading } = useGetProducts(productIds);

  useEffect(() => {
    if (orderQuantity && productsData.length > 0) {
      const items = productsData.map((orderItem, index) => ({
        data: orderItem,
        orderQuantity: orderQuantity[index],
      }));
      const shippingFees = items.map((item) => item.data.shipping_fee || 0);
      const prices = items.map((item) => item.data.price || 0);
      setOrderItems(items);
      setShipFee(shippingFees);
      setPrice(prices);
    }
  }, [isLoading]);

  if (!orderList || !productIds || isLoading || !orderQuantity || !totalPrice) {
    return null;
  }

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
        {orderItems.map((orderItem, i) => (
          <OrderItem key={orderItem.data.product_id}>
            <div>
              <img src={orderItem.data.image} alt='상품 이미지' />
              <div>
                <p>{orderItem.data.store_name}</p>
                <h3>{orderItem.data.product_name}</h3>
                <p>수량 : 1개</p>
              </div>
            </div>
            <div>-</div>
            <div>
              {orderItem.data.shipping_fee
                ? `${orderItem.data.shipping_fee?.toLocaleString()}원`
                : `무료배송`}
            </div>
            <div>
              <strong>{orderItem.data.price?.toLocaleString()}원</strong>
            </div>
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
    object-position: 0 0;
    box-shadow: 0px 1px 2px 0px rgba(118, 118, 118, 0.25);
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
