import React from 'react';
import styled from 'styled-components';

import PlusIcon from '../../assets/icon-plus-line.svg';
import MinusIcon from '../../assets/icon-minus-line.svg';

interface QuantityButtonProps {
  stock: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityButton = ({ stock, quantity, setQuantity }: QuantityButtonProps) => {
  // 수량 감소
  const handleQuantityDec = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // 수량 증가
  const handleQuantityInc = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <QuantityButtonBox>
      <button type='button' onClick={handleQuantityDec} disabled={stock > 0 ? false : true}>
        <img src={MinusIcon} alt='감소 버튼' />
      </button>
      <p>{quantity}</p>
      <button type='button' onClick={handleQuantityInc} disabled={stock > quantity ? false : true}>
        <img src={PlusIcon} alt='증가 버튼' />
      </button>
    </QuantityButtonBox>
  );
};

export default QuantityButton;

export const QuantityButtonBox = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid var(--border-color);
  font-size: var(--font-md);

  button {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    img {
      width: 20px;
      height: 20px;
    }
  }

  button,
  p {
    width: 50px;
    text-align: center;
  }
  button:first-child {
    border-right: 1px solid var(--border-color);
    border-radius: 5px 0 0 5px;
  }
  button:first-child:active,
  p + button:active {
    background-color: var(--point-color);
    img {
      filter: invert(95%) sepia(100%) saturate(0%) hue-rotate(103deg) brightness(104%) contrast(105%);
    }
  }
  p + button {
    border-left: 1px solid var(--border-color);
    border-radius: 0 5px 5px 0;
  }
`;
