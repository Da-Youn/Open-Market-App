import React from 'react';
import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

import Button from '../common/Button';
import { OrderReq } from 'src/hooks/useOrder';
import { media } from 'src/style/mediaQuery';

export interface OrderFormProps {
  orderType: string;
  setOrderData: React.Dispatch<React.SetStateAction<OrderReq>>;
}

const OrderForm = ({ setOrderData, orderType }: OrderFormProps) => {
  const [phoneNumbers, setPhoneNumbers] = useState(['', '', '']);
  const [address, setAddress] = useState(['', '']);

  if (!orderType) {
    return null;
  }

  const handlePhoneNum = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: phoneNumbers.join(''),
    }));
  };

  const handleAddress = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const updatedAddress = [...address];
    updatedAddress[index] = value;
    setAddress(updatedAddress);
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: address.join(' '),
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
  };

  return (
    <OrderFormLayout>
      <h2>배송정보</h2>
      <fieldset>
        <legend>주문자 정보</legend>
        <label htmlFor='username'>
          <p>이름</p>
          <input type='text' id='username' />
        </label>
        <label htmlFor='userPhone1'>
          <p>휴대폰</p>
          <PhoneNumInputBox>
            {phoneNumbers.map((phoneNumber, index) => (
              <React.Fragment key={index}>
                <input
                  type='tel'
                  id={`userPhone${index + 1}`}
                  className={`phone-${index === 0 ? 'first' : index === 1 ? 'mid' : 'last'}`}
                  onChange={(e) => handlePhoneNum(e, index)}
                />
                {index < phoneNumbers.length - 1 && <span>-</span>}
              </React.Fragment>
            ))}
          </PhoneNumInputBox>
        </label>
        <label htmlFor='userEmail'>
          <p>이메일</p>
          <input type='email' id='userEmail' name='userEmail' onChange={handleInputChange} />
        </label>
      </fieldset>
      <fieldset>
        <legend>배송지 정보</legend>
        <label htmlFor='receiverName'>
          <p>수령인</p>
          <input type='text' name='receiver' id='receiverName' onChange={handleInputChange} />
        </label>
        <label htmlFor='receiverPhone1'>
          <p>휴대폰</p>
          <PhoneNumInputBox>
            {phoneNumbers.map((phoneNumber, index) => (
              <React.Fragment key={index}>
                <input
                  type='tel'
                  id={`userPhone${index + 1}`}
                  name='receiver_phone_number'
                  className={`phone-${index === 0 ? 'first' : index === 1 ? 'mid' : 'last'}`}
                  onChange={(e) => handlePhoneNum(e, index)}
                />
                {index < phoneNumbers.length - 1 && <span>-</span>}
              </React.Fragment>
            ))}
          </PhoneNumInputBox>
        </label>
        <label htmlFor='addressSearch'>
          <p>배송주소</p>
          <AdressInputBox>
            <div>
              <input type='search' id='addressSearch' />
              <Button
                type='submit'
                width='154px'
                $padding='0'
                $minWidth='154px'
                fontSize='var(--font-sm)'
                fontWeight='400'
              >
                우편번호 조회
              </Button>
            </div>
            <div className='deliveryAddress'>
              {address.map((add, index) => (
                <React.Fragment key={index}>
                  <input
                    type='text'
                    id={`deliveryAddress${index + 1}`}
                    name='address'
                    value={add}
                    onChange={(e) => handleAddress(e, index)}
                  />
                </React.Fragment>
              ))}
            </div>
          </AdressInputBox>
        </label>
        <label htmlFor='deliveryMessage'>
          <p>배송 메시지</p>
          <div>
            <input type='search' name='address_message' id='deliveryMessage' onChange={handleInputChange} />
          </div>
        </label>
      </fieldset>
    </OrderFormLayout>
  );
};
const OrderFormLayout = styled.form`
  margin-bottom: 70px;

  legend {
    font-size: var(--font-md);
    padding-bottom: 8px;
    margin-bottom: 30px;
  }
  h2,
  legend {
    border-bottom: 2px solid var(--border-color);
  }

  fieldset {
    margin-top: 30px;
  }

  label {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
    ${media.tablet(`
      flex-direction:column;      
      align-items:stretch;
      gap:6px;
       padding: 10px 0;
      `)}

    p {
      min-width: 170px;
    }
    input {
      width: 100%;
      max-width: 300px;
      padding-left: 10px;
      height: 40px;
      border: 1px solid var(--border-color);
    }
  }
`;

const PhoneNumInputBox = styled.div`
  align-items: center;
  .phone-first {
    width: 100%;
    max-width: 80px;
    ${media.mobile(`
      max-width: 60px;    
      `)}
  }
  .phone-mid,
  .phone-last {
    width: 100%;
    max-width: 100px;
    ${media.mobile(`
      max-width: 70px;    
      `)}
  }

  span {
    margin: 0 6px;
  }
`;

const AdressInputBox = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  #addressSearch {
    max-width: 150px;
  }
  #deliveryAddress1 {
    max-width: 550px;
  }
  #deliveryAddress2 {
    max-width: 250px;
  }

  .deliveryAddress {
    ${media.mobile(`
      flex-direction:column;      

      `)}
  }
`;

export default OrderForm;
