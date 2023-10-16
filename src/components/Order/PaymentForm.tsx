import styled from 'styled-components';

import Button from '../common/Button';
import CheckBoxIcon from '../../assets/check-box.svg';
import CheckFillBoxIcon from '../../assets/check-fill-box.svg';

export interface PaymentFormProps {}

const PaymentForm = (props: PaymentFormProps) => {
  return (
    <PaymentLayout>
      <PaymentFormBox>
        <h2>결제수단</h2>
        <div>
          <label htmlFor='card'>
            <input type='radio' name='payment' id='card' value='bank' checked />
            신용/체크카드
          </label>
          <label htmlFor='bank'>
            <input type='radio' name='payment' id='bank' value='bank' />
            무통장 입금
          </label>
          <label htmlFor='phone'>
            <input type='radio' name='payment' id='phone' value='phone' />
            휴대폰 결제
          </label>
          <label htmlFor='naver'>
            <input type='radio' name='payment' id='naver' value='naver' />
            네이버페이
          </label>
          <label htmlFor='kakao'>
            <input type='radio' name='payment' id='kakao' value='kakao' />
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
                <span>dd</span>원
              </p>
            </li>
            <li>
              <h3>- 할인금액</h3>
              <p>
                <span>dd</span>원
              </p>
            </li>
            <li>
              <h3>- 배송비</h3>
              <p>
                <span>dd</span>원
              </p>
            </li>
            <li>
              <h3>- 결제금액</h3>
              <strong>dd원</strong>
            </li>
          </ul>
          <TotalPaymentSubmit>
            <div>
              <button>
                <img src={CheckBoxIcon} alt='체크박스 아이콘' />
              </button>
              <p>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</p>
            </div>
            <Button width='300px' type='submit'>
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
