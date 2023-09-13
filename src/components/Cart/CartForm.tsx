import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { getProductData } from 'src/store/productSlice';
import { getCartListData } from 'src/store/cartListSlice';
import styled from 'styled-components';
import CartItem from './CartItem.tsx';
import Button from '../common/Button.tsx';
import PlusIcon from '../../assets/icon-plus-line.svg';
import MinusIcon from '../../assets/icon-minus-line.svg';
import CheckBox from '../../assets/check-box(circle).svg';
import CheckFillBox from '../../assets/check-fill-box(circle).svg';

export interface CartListProps {
  cartListDetail: any;
}

const CartForm = (props: CartListProps) => {
  const dispatch = useDispatch<any>();
  const cartListData = useSelector(
    (state: RootState) => state.cartList.cartListData?.results,
  );

  const [cartListDetail, setCartListDetail] = useState<any>(null);

  useEffect(() => {
    dispatch(getCartListData()); // createAsyncThunk로 비동기 요청 수행

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cartListData?.length) {
      const tempCartListDetail: any[] = [];

      // Fetch productData for each item
      cartListData.forEach((item: any) => {
        dispatch(getProductData(item.product_id)).then((product: any) => {
          tempCartListDetail.push(product.payload);

          // If all products are fetched, update the state
          if (tempCartListDetail.length === cartListData.length) {
            setCartListDetail(tempCartListDetail);
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartListData]);

  return (
    <CartFormLayout>
      <h1>장바구니</h1>
      <CartFormBox>
        <CartListCol role='columnheader'>
          <button>
            <p className='a11y-hidden'>목록 전체선택 버튼</p>
            <img src={CheckBox} alt='장바구니 목록 전체선택 버튼 이미지' />
          </button>
          <span>
            <p className='a11y-hidden'>이미지</p>
          </span>
          <span>상품정보</span>
          <span>수량</span>
          <span>상품 금액</span>
        </CartListCol>
        <CartList>
          <h2 className='a11y-hidden'>장바구니 상품 정보</h2>
          {cartListDetail &&
            cartListDetail.map((cartItem: any) => (
              <CartItem key={cartItem.product_id} data={cartItem} />
            ))}
        </CartList>
        <TotalAmountBox>
          <AmountCalcInfo>
            <p>총 상품금액</p>
            <p>
              <span>46,500</span> 원
            </p>
          </AmountCalcInfo>
          <PlusIconStyle>
            <img src={PlusIcon} alt='' />
          </PlusIconStyle>
          <AmountCalcInfo>
            <p>상품 할인</p>
            <p>
              <span>0</span> 원
            </p>
          </AmountCalcInfo>
          <MinusIconStyle>
            <img src={MinusIcon} alt='' />
          </MinusIconStyle>
          <AmountCalcInfo>
            <p>배송비</p>
            <p>
              <span>0</span> 원
            </p>
          </AmountCalcInfo>
          <AmountCalcInfo>
            <p>결제 예정 금액</p>
            <p>
              <strong>46,500</strong> 원
            </p>
          </AmountCalcInfo>
        </TotalAmountBox>
        <Button width='220px' fontSize='var(--font-lg)'>
          주문하기
        </Button>
      </CartFormBox>
    </CartFormLayout>
  );
};

const CartFormLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 54px 20px 0;

  h1 {
    font-size: var(--font-xl);
    font-weight: 700;
    margin-bottom: 52px;
  }
`;

const CartFormBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
`;

const CartListCol = styled.section`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  margin-bottom: 35px;
  border-radius: 10px;
  background-color: var(--sub-color);
  text-align: center;

  button {
    padding: 0 20px 0 30px;
  }

  button + span {
    min-width: 160px;
  }
  button + span + span {
    min-width: 200px;
    width: 430px;
    padding-left: 20px;
  }
  button + span + span + span {
    min-width: 150px;
  }
  button + span + span + span + span {
    width: 100%;
    max-width: 300px;
  }
`;

const CartList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TotalAmountBox = styled.div`
  width: 100%;
  height: 150px;
  margin: 80px 0 40px;
  background-color: var(--sub-color);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  position: relative;
`;
const AmountCalcInfo = styled.div`
  width: 100%;
  p:first-child {
    margin-bottom: 12px;
  }
  p:last-child {
    height: 30px;
  }
  span {
    font-size: 24px;
    font-weight: 700;
  }

  &:last-child {
    p:first-child {
      font-weight: 700;
    }
    p:last-child {
      color: var(--error-color);
    }
    strong {
      font-weight: 700;
      font-size: var(--font-xl);
    }
    div:nth-child(2) {
      background-color: red;
    }
  }
`;
const MinusIconStyle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 25%;
  transform: translate(-50%, 0);
  background-color: #fff;
`;
const PlusIconStyle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #fff;
`;

export default CartForm;
