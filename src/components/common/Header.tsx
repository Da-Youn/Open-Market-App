import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';

import UserIcon from '../../assets/icon-user.svg';
import CoralLogo from '../../assets/logo-coral.png';
import SearchIcon from '../../assets/icon-search.svg';
import CartIcon from '../../assets/icon-shopping-cart.svg';
import ShoppingBagImg from '../../assets/icon-shopping-bag.svg';

interface HeaderProps {
  id: string;
}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('user_type');
  const isLoggedIn = !!token;

  const handleSellerBtnClick = () => {
    // navigate 함수를 이용하여 페이지 이동
    navigate('/my/seller_center');
  };

  return (
    <HeaderWrapper id={props.id}>
      <div className='header-left'>
        <h1>
          <Link to='/'>
            <img src={CoralLogo} alt='호두 로고 이미지' />
          </Link>
        </h1>
        <form>
          <input type='text' placeholder='상품을 검색해보세요!' />
          <button type='submit'>
            <img src={SearchIcon} alt='' />
          </button>
        </form>
      </div>

      <div className='header-right'>
        <Link to='/cart'>
          <img src={CartIcon} alt='장바구니 아이콘' />
          <p>장바구니</p>
        </Link>
        {!isLoggedIn ? (
          <Link to='/account/login'>
            <img src={UserIcon} alt='유저 아이콘' />
            <p>로그인</p>
          </Link>
        ) : userType === 'BUYER' ? (
          <Link to='/my/page'>
            <img src={UserIcon} alt='유저 아이콘' />
            <p>마이페이지</p>
          </Link>
        ) : (
          <SellerBtn
            width='168px'
            fontWeight='400'
            onClick={handleSellerBtnClick}
          >
            <img src={ShoppingBagImg} alt='' />
            판매자 센터
          </SellerBtn> // 판매자센터 버튼
        )}
      </div>
    </HeaderWrapper>
  );
};

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  & div {
    display: flex;
    gap: 26px;
    align-items: center;
  }

  & .header-left {
    gap: 26px;
    h1 {
      margin-right: 4px;

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
