import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CoralLogo from '../../assets/logo-coral.png';
import UserIcon from '../../assets/icon-user.svg';
import CartIcon from '../../assets/icon-shopping-cart.svg';
import SearchIcon from '../../assets/icon-search.svg';

interface HeaderProps {
  id: string;
}

const Header: React.FC<HeaderProps> = ({ id }) => {
  return (
    <HeaderWrapper id={id}>
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
        <Link to='/account/login'>
          <img src={UserIcon} alt='유저 아이콘' />
          <p>로그인</p>
        </Link>
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

export default Header;
