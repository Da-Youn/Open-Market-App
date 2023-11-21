import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { OrderReq } from 'src/hooks/useOrder';
import { usePostOrder } from 'src/hooks/useOrder';

import Button from '../common/Button';
import { media } from 'src/style/mediaQuery';

import CheckBoxIcon from '../../assets/check-box.svg';
import CheckFillBoxIcon from '../../assets/check-fill-box.svg';

export interface PaymentFormProps {
  orderData: OrderReq;
  totalPrice: number | undefined;
  price: number[] | undefined;
  shipFee: number[] | undefined;
  setOrderData: React.Dispatch<React.SetStateAction<OrderReq>>;
}

const PaymentForm = ({ orderData, setOrderData, totalPrice, price, shipFee }: PaymentFormProps) => {
  ///CARD, DEPOSIT, PHONE_PAYMENT, NAVERPAY, KAKAOPAY
  const navigate = useNavigate();
  const [payment, setPayment] = useState('CARD');
  const [checkBoxImg, setCheckBoxImg] = useState(CheckBoxIcon);
  const usePostOrderMutate = usePostOrder();
  const [isActive, setIsActive] = useState(true);

  if (!totalPrice || !price || !shipFee) return null;

  const prices = price?.reduce((a, c) => a + c, 0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPayment(value);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
  };

  const handleToggleBtn = () => {
    if (checkBoxImg === CheckBoxIcon) {
      setCheckBoxImg(CheckFillBoxIcon);
      setIsActive(false);
    } else {
      setCheckBoxImg(CheckBoxIcon);
      setIsActive(true);
    }
  };

  const handlePaymentBtn = async () => {
    try {
      const response = await usePostOrderMutate.mutateAsync(orderData);
      if (response) {
        navigate('/my/page');
      }
    } catch (error: any) {
      // 예외 메시지를 이용해 모달 타입 설정
      console.error(error);
    }
  };

  return (
    <PaymentLayout>
      <PaymentFormBox>
        <h2>결제수단</h2>
        <div>
          <label htmlFor='card'>
            <input
              type='radio'
              name='payment_method'
              id='card'
              value='CARD'
              checked={payment === 'CARD'}
              onChange={handleInputChange}
            />
            신용/체크카드
          </label>
          <label htmlFor='bank'>
            <input
              type='radio'
              name='payment_method'
              id='bank'
              value='DEPOSIT'
              checked={payment === 'DEPOSIT'}
              onChange={handleInputChange}
            />
            무통장 입금
          </label>
          <label htmlFor='phone'>
            <input
              type='radio'
              name='payment_method'
              id='phone'
              value='PHONE_PAYMENT'
              checked={payment === 'PHONE_PAYMENT'}
              onChange={handleInputChange}
            />
            휴대폰 결제
          </label>
          <label htmlFor='naver'>
            <input
              type='radio'
              name='payment_method'
              id='naver'
              value='NAVERPAY'
              checked={payment === 'NAVERPAY'}
              onChange={handleInputChange}
            />
            네이버페이
          </label>
          <label htmlFor='kakao'>
            <input
              type='radio'
              name='payment_method'
              id='kakao'
              value='KAKAOPAY'
              checked={payment === 'KAKAOPAY'}
              onChange={handleInputChange}
            />
            카카오페이
          </label>
        </div>
      </PaymentFormBox>
      <TotalPaymentBox>
        <h2>최종 결제정보</h2>

        <TotalPaymentInfo>
          <ul>
            <li>
              <h3>- 상품금액</h3>
              <p>
                <span>{prices?.toLocaleString()}</span>원
              </p>
            </li>
            <li>
              <h3>- 할인금액</h3>
              <p>
                <span>0</span>원
              </p>
            </li>
            <li>
              <h3>- 배송비</h3>
              <p>
                <span>{shipFee?.toLocaleString()}</span>원
              </p>
            </li>
            <li>
              <h3>- 결제금액</h3>
              <strong>{totalPrice?.toLocaleString()}원</strong>
            </li>
          </ul>
          <TotalPaymentSubmit>
            <div>
              <button type='button' onClick={handleToggleBtn}>
                <img src={checkBoxImg} alt='체크박스 아이콘' />
              </button>
              <p>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</p>
            </div>
            <Button width='300px' type='submit' onClick={handlePaymentBtn} disabled={isActive}>
              결제하기
            </Button>
          </TotalPaymentSubmit>
        </TotalPaymentInfo>
      </TotalPaymentBox>
    </PaymentLayout>
  );
};

/* PaymentForm */
const PaymentLayout = styled.section`
  width: 100%;
  display: flex;
  gap: 40px;
  ${media.tablet(`
       flex-direction: column;
      `)}
`;

const PaymentFormBox = styled.form`
  width: 100%;
  padding-bottom: 18px;
  border-bottom: 2px solid var(--border-color);
  h2 {
    border-bottom: 2px solid var(--border-color);
    margin-bottom: 18px;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-left: 12px;
  }
  label {
    display: flex;
    align-items: center;

    input {
      margin-right: 10px;
    }
  }
`;
const TotalPaymentBox = styled.div`
  width: 100%;
  max-width: 480px;
  ${media.tablet(`
         max-width: 100%;
      `)}
`;
const TotalPaymentInfo = styled.div`
  border-radius: 10px;
  border: 2px solid var(--main-color);
  ul {
    padding: 34px 30px 25px;
  }
  ul li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    span {
      margin-right: 4px;
      font-weight: 700;
      font-size: var(--font-md);
    }
  }
  ul li:last-child {
    padding-top: 30px;
    border-top: 1px solid var(--border-color);
    strong {
      color: var(--error-color);
      font-size: var(--font-lg);
      font-weight: 700;
    }
  }
`;
const TotalPaymentSubmit = styled.div`
  width: 100%;
  padding: 30px 30px 34px;
  border-radius: 0 0 10px 10px;
  background-color: var(--sub-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;

    button {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default PaymentForm;
