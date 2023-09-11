import React, { useState } from 'react';
import styled from 'styled-components';
import PlusIcon from '../../assets/icon-plus-line.svg';
import MinusIcon from '../../assets/icon-minus-line.svg';
export interface QuantityButtonProps {
  stock: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}
const QuantityButton = (props: QuantityButtonProps) => {
  const handleQuantityDec = () => {
    if (props.quantity > 1) {
      props.setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityInc = () => {
    if (props.quantity < props.stock) {
      props.setQuantity((prev) => prev + 1);
    }
  };

  return (
    <QuantityButtonWrapper>
      <button
        type='button'
        onClick={handleQuantityDec}
        disabled={props.stock > 0 ? false : true}
      >
        <img src={MinusIcon} alt='감소 버튼' />
      </button>
      <p>{props.quantity}</p>
      <button
        type='button'
        onClick={handleQuantityInc}
        disabled={props.stock > 0 ? false : true}
      >
        <img src={PlusIcon} alt='증가 버튼' />
      </button>
    </QuantityButtonWrapper>
  );
};

export default QuantityButton;

export const QuantityButtonWrapper = styled.div`
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
  }
  p + button {
    border-left: 1px solid var(--border-color);
  }
`;
