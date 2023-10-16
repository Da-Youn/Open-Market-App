import styled from 'styled-components';

import Button from '../common/Button';

export interface OrderFormProps {}

const OrderForm = (props: OrderFormProps) => {
  return (
    <OrderFormLayout>
      <h2>배송정보</h2>
      <fieldset>
        <legend>주문자 정보</legend>
        <label htmlFor='username'>
          <p>이름</p>
          <input type='text' name='username' />
        </label>
        <label htmlFor='phone'>
          <p>휴대폰</p>
          <input type='tel' name='phone' className='phone-first' />
          <span>-</span>
          <input type='tel' name='phone' className='phone-mid' />
          <span>-</span>
          <input type='tel' name='phone' className='phone-last' />
        </label>
        <label htmlFor='email'>
          <p>이메일</p>
          <input type='email' name='email' />
        </label>
      </fieldset>
      <fieldset>
        <legend>배송지 정보</legend>{' '}
        <label htmlFor='username'>
          <p>수령인</p>
          <input type='text' name='username' />
        </label>
        <label htmlFor='phone'>
          <p>휴대폰</p>
          <input type='tel' name='phone' className='phone-first' />
          <span>-</span>
          <input type='tel' name='phone' className='phone-mid' />
          <span>-</span>
          <input type='tel' name='phone' className='phone-last' />
        </label>
        <label htmlFor='adress'>
          <p>배송주소</p>
          <div>
            <div>
              <input type='search' name='adress' />
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
            <input type='text' name='adress' />
            <input type='text' name='adress' />
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
