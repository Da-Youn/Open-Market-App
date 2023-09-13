import { useState } from 'react';
import styled from 'styled-components';
import QuantityButton from '../common/QuantityButton';
import Button from '../common/Button';
import CheckBox from '../../assets/check-box(circle).svg';
import CheckFillBox from '../../assets/check-fill-box(circle).svg';

interface CartItemProps {
  key: string;
  data: any;
}

const CartItem = (props: CartItemProps) => {
  const itemData = props.data;
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <CartItemLayout>
      <CheckBtn>
        <p className='a11y-hidden'>상품 선택 버튼</p>
        <img src={CheckBox} alt='상품 선택 버튼 이미지' />
      </CheckBtn>
      <CartItemImg src={itemData.image} alt='' />
      <CartItemInfo>
        <div>
          <p>{itemData.store_name}</p>
          <h3>{itemData.product_name}</h3>
          <strong>{itemData.price.toLocaleString()}원</strong>
        </div>
        <span>택배배송 / 무료배송</span>
      </CartItemInfo>
      <div>
        <QuantityButton
          stock={itemData.stock}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <CartItemAmount>
        <strong> {(quantity * itemData.price).toLocaleString()}원</strong>
        <Button
          width='130px'
          fontWeight='400'
          fontSize='var(--font-sm)'
          $padding='10px'
        >
          주문하기
        </Button>
      </CartItemAmount>
    </CartItemLayout>
  );
};

const CartItemLayout = styled.li`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 2px solid var(--sub-border-color);
`;
const CheckBtn = styled.button`
  padding: 0 20px 0 30px;
`;

const CartItemImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
`;

const CartItemInfo = styled.div`
  min-width: 200px;
  width: 430px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      font-size: var(--font-xs);
      color: var(--sub-font-color);
    }
    h3 {
      font-size: var(--font-md);
    }
    strong {
      font-size: var(--font-sm);
      font-weight: 700;
    }
  }
  span {
    font-size: var(--font-xs);
    color: var(--sub-font-color);
  }
`;

const CartItemAmount = styled.div`
  width: 100%;
  max-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;

  strong {
    font-size: var(--font-md);
    font-weight: 700;
    color: var(--error-color);
  }
`;
export default CartItem;
