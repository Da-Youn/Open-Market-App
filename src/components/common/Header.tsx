import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';
import { useLocation } from 'react-router-dom';
import UserIcon from '../../assets/icon-user.svg';
import BrickLogo from '../../assets/logo-brick.png';
import SearchIcon from '../../assets/icon-search.svg';
import SignupIcon from '../../assets/icon-signup.svg';
import CartIcon from '../../assets/icon-shopping-cart.svg';
import ShoppingBagImg from '../../assets/icon-shopping-bag.svg';

interface HeaderProps {
  id: string;
}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const currPage = useLocation().pathname;
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('user_type');
  const isLoggedIn = !!token;

  const handleSellerBtnClick = () => {
    // navigate 함수를 이용하여 페이지 이동
    navigate('/my/seller_center');
  };

  if (currPage.startsWith('/account')) return null;

  return (
    <HeaderLayout id={props.id}>
      <HeaderBox>
        <div className='header-left'>
          <h1>
            <Link to='/'>
              <img src={BrickLogo} alt='호두 로고 이미지' />
            </Link>
            {currPage === '/my/seller_center' && '판매자 센터'}
          </h1>
          {currPage !== '/my/seller_center' && (
            <form>
              <input type='text' placeholder='상품을 검색해보세요!' />
              <button type='submit'>
                <img src={SearchIcon} alt='' />
              </button>
            </form>
          )}
        </div>
        <div className='header-right'>
          {!isLoggedIn ? (
            <>
              <Link to='/account/login'>
                <img src={UserIcon} alt='유저 아이콘' />
                <p>로그인</p>
              </Link>
              <Link to='/account/signup'>
                <img src={SignupIcon} alt='회원가입 아이콘' />
                <p>회원가입</p>
              </Link>
            </>
          ) : userType === 'BUYER' ? (
            <>
              <Link to='/my/cart'>
                <img src={CartIcon} alt='장바구니 아이콘' />
                <p>장바구니</p>
              </Link>
              <Link to='/my/page'>
                <img src={UserIcon} alt='유저 아이콘' />
                <p>마이페이지</p>
              </Link>
            </>
          ) : (
            <SellerBtn
              width='168px'
              fontWeight='400'
              onClick={handleSellerBtnClick}
            >
              <img src={ShoppingBagImg} alt='' />
              판매자 센터
            </SellerBtn>
          )}
        </div>
      </HeaderBox>
    </HeaderLayout>
  );
};

const HeaderLayout = styled.header`
  position: fixed;
  top: 0;

  margin-bottom: 90px;
  width: 100%;
  height: 90px;
  margin: auto;
  background-color: #fff;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
  z-index: 100;
`;

export const HeaderBox = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    gap: 26px;
    align-items: center;
  }

  & .header-left {
    gap: 26px;
    h1 {
      display: flex;
      margin-right: 4px;
      align-items: center;
      gap: 12px;
      font-size: 30px;
      font-weight: 700;

      img {
        width: 160px;
        vertical-align: bottom;
      }
    }

    form {
      width: 400px;
      height: 46px;
      border: 2px solid var(--main-color);
      border-radius: 50px;
      padding: 0 22px;
      color: var(--sub-font-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    button {
      width: 28px;
      height: 28px;
      display: inline-block;
      margin-right: 0;
    }

    input {
      width: 100%;
    }
  }

  & .header-right {
    a {
      text-align: center;
      color: var(--sub-font-color);
    }
    a:hover {
      img {
        filter: invert(44%) sepia(12%) saturate(1416%) hue-rotate(315deg)
          brightness(97%) contrast(95%);
      }
      color: var(--main-color);
    }
  }
`;

const SellerBtn = styled(Button)`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export default Header;
