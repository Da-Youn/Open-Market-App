import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '../common/Button';
import QuantityButton from '../common/QuantityButton';

import { useGetProduct } from 'src/hooks/useProduct';
import CheckBoxIcon from '../../assets/check-box(circle).svg';
import CheckBoxFilledIcon from '../../assets/check-fill-box(circle).svg';

type AmountType = {
  [key: number]: number;
};

interface CartItemProps {
  key: number;
  data: any;
  isAllChecked: boolean | null;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean | null>>;
  amount: AmountType;
  setAmount: React.Dispatch<React.SetStateAction<AmountType>>;
}

const CartItem = ({
  data,
  isAllChecked,
  setIsAllChecked,
  amount,
  setAmount,
}: CartItemProps) => {
  const itemData = useGetProduct(data.product_id).productData;
  const [quantity, setQuantity] = useState<number>(1);
  const [checkBox, setCheckBox] = useState<string>(CheckBoxIcon);
  //장바구니 수량 변경
  useEffect(() => {
    if (isAllChecked === false) {
      setAmount({});
      setCheckBox(CheckBoxIcon);
    } else if (isAllChecked === true) {
      setCheckBox(CheckBoxFilledIcon);
      AddAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllChecked]);

  useEffect(() => {
    if (checkBox === CheckBoxFilledIcon) {
      AddAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  // 체크 박스 활성화
  const handleCheckBoxActive = () => {
    if (checkBox === CheckBoxIcon) {
      AddAmount();
    } else if (checkBox === CheckBoxFilledIcon) {
      DeleteAmount();
    }
  };

  // 체크 시 : 가격 추가하기
  const AddAmount = () => {
    if (itemData.price && itemData.product_id) {
      const totalAmount = quantity * itemData.price;
      setAmount((prev) => ({
        ...prev,
        [itemData.product_id]: totalAmount,
      }));
      setCheckBox(CheckBoxFilledIcon);
    }
  };

  // 체크 시 : 가격 삭제하기
  const DeleteAmount = () => {
    if (itemData) {
      const newData: AmountType = { ...amount };
      delete newData[itemData && itemData.product_id];
      setAmount(newData);
      setCheckBox(CheckBoxIcon);
    }
  };

  return (
    <CartItemLayout>
      <CheckBtn onClick={handleCheckBoxActive}>
        <p className='a11y-hidden'>상품 선택 버튼</p>
        <img src={checkBox} alt='상품 선택 버튼 이미지' />
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
        <strong>{(quantity * itemData.price).toLocaleString()}원</strong>
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
