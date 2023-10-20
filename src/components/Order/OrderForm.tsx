import styled from 'styled-components';

import Button from '../common/Button';

type OrderInfo = {
  addressMessage: string | undefined;
  address: string | undefined;
  phoneNumber: string[] | undefined;
  receiver: string | undefined;
  totalPrice: number | undefined;
};

export interface OrderFormProps {
  orderInfo: OrderInfo | undefined;
}

const OrderForm = ({ orderInfo }: OrderFormProps) => {
  if (!orderInfo) {
    return null;
  }

  const { addressMessage, address, phoneNumber, receiver } = orderInfo;
  return (
    <OrderFormLayout>
      <h2>배송정보</h2>
      <fieldset>
        <legend>주문자 정보</legend>
        <label htmlFor='username'>
          <p>이름</p>
          <input type='text' id='username' defaultValue={receiver} />
        </label>
        <label htmlFor='userPhone1'>
          <p>휴대폰</p>
          <div>
            <input
              type='tel'
              id='userPhone1'
              className='phone-first'
              defaultValue={phoneNumber && phoneNumber[0]}
            />
            <span>-</span>
            <input
              type='tel'
              id='userPhone2'
              className='phone-mid'
              defaultValue={phoneNumber && phoneNumber[1]}
            />
            <span>-</span>
            <input
              type='tel'
              id='userPhone3'
              className='phone-last'
              defaultValue={phoneNumber && phoneNumber[2]}
            />
          </div>
        </label>
        <label htmlFor='userEmail'>
          <p>이메일</p>
          <input type='email' id='userEmail' name='userEmail' />
        </label>
      </fieldset>
      <fieldset>
        <legend>배송지 정보</legend>
        <label htmlFor='receiverName'>
          <p>수령인</p>
          <input type='text' id='receiverName' defaultValue={receiver} />
        </label>
        <label htmlFor='receiverPhone1'>
          <p>휴대폰</p>
          <div>
            <input
              type='tel'
              id='receiverPhone1'
              className='phone-first'
              defaultValue={phoneNumber && phoneNumber[0]}
            />
            <span>-</span>
            <input
              type='tel'
              id='receiverPhone2'
              className='phone-mid'
              defaultValue={phoneNumber && phoneNumber[1]}
            />
            <span>-</span>
            <input
              type='tel'
              id='receiverPhone3'
              className='phone-last'
              defaultValue={phoneNumber && phoneNumber[2]}
            />
          </div>
        </label>
        <label htmlFor='addressSearch'>
          <p>배송주소</p>
          <div>
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
            <input type='text' id='deliveryAddress1' defaultValue={address} />
            <input type='text' id='deliveryAddress2' />
          </div>
        </label>
        <label htmlFor='deliveryMessage'>
          <p>배송 메시지</p>
          <div>
            <input
              type='search'
              id='deliveryMessage'
              defaultValue={addressMessage}
            />
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
  }
  h2,
  legend {
    border-bottom: 2px solid var(--border-color);
  }

  fieldset {
    margin-top: 40px;
  }

  label {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
    p {
      width: 100%;
      min-width: 80px;
      max-width: 170px;
      display: flex;
    }
    input {
      padding-left: 10px;
      height: 40px;
      border: 1px solid var(--border-color);
    }
    .phone-first {
      width: 80px;
    }
    .phone-mid,
    .phone-last {
      width: 100px;
    }
    span {
      margin: 0 10px;
    }

    div {
      max-width: 800px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      div {
        flex-direction: row;
        gap: 10px;
      }
    }

    input[type='text'][name='address'] {
    }
  }
`;

export default OrderForm;
