import styled from 'styled-components';

import { ProductRes } from 'src/hooks/useProduct';

export interface MypageOrderItemProps {
  item: ProductRes;
  quantity: number;
  deliveryStatus: string | undefined;
}

const MypageOrderItem = ({
  item,
  quantity,
  deliveryStatus,
}: MypageOrderItemProps) => {
  return (
    <MypageOrderItemLayout>
      <ItemDeliveryStatus>구매 확정</ItemDeliveryStatus>
      <ItemBox>
        <ItemImageBox>
          <img src={item.image} alt='' />
        </ItemImageBox>
        <ItemInfoBox>
          <ItemInfoStore>{item.store_name}</ItemInfoStore>
          <ItemInfoName>{item.product_name}</ItemInfoName>
          <ItemInfoPrice>
            {item.price?.toLocaleString()}원 <span>/ {quantity}개</span>
          </ItemInfoPrice>
        </ItemInfoBox>
      </ItemBox>
      <ItemButtonBox>
        <button>리뷰작성</button>
        <button>문의하기</button>
      </ItemButtonBox>
    </MypageOrderItemLayout>
  );
};

const MypageOrderItemLayout = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  display: flex;
  gap: 12px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  margin-top: 10px;
`;

const ItemDeliveryStatus = styled.p`
  font-weight: 700;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ItemImageBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    object-position: 50% 0;
  }
`;
const ItemInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const ItemInfoStore = styled.p`
  font-size: var(--font-xs);
  color: var(--sub-font-color);
`;
const ItemInfoName = styled.p``;
const ItemInfoPrice = styled.p`
  font-weight: 700;
  span {
    font-size: var(--font-xs);
    font-weight: 500;
    color: var(--sub-font-color);
  }
`;

const ItemButtonBox = styled.div`
  display: flex;
  gap: 10px;
  button {
    border-radius: 5px;
    width: 100%;
    height: 35px;
  }
  button:first-child {
    color: var(--main-color);
    background-color: var(--hover-color);
  }
  button:last-child {
    background-color: var(--sub-color);
  }
`;

export default MypageOrderItem;
