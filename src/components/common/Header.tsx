import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';
import SearchForm from './SearchForm';
import MypageDropDown from './MypageDropDown';

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
  const userName = localStorage.getItem('username');
  const userType = localStorage.getItem('user_type');
  const isLoggedIn = !!token;
  const [isOpened, setIsOpened] = useState(false);
  const handleSellerBtnClick = () => {
    // navigate 함수를 이용하여 페이지 이동
    navigate('/seller/dashboard');
  };

  if (currPage.startsWith('/account')) return null;

  const handleBtnClick = () => {
    if (isOpened) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  };

  return (
    <HeaderLayout id={props.id}>
      <HeaderBox>
        <HeaderSection className='header-left'>
          <h1>
            <Link to='/'>
              <img src={BrickLogo} alt='호두 로고 이미지' />
            </Link>
            {currPage.startsWith('/seller') && '판매자 센터'}
          </h1>
          {!currPage.startsWith('/seller') && <SearchForm />}
        </HeaderSection>
        <HeaderSection className='header-right'>
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
              <div>
                <MyPageBtn onClick={handleBtnClick}>
                  <img src={UserIcon} alt='유저 아이콘' />
                  <p>
                    <span>{userName}</span> 님
                  </p>
                </MyPageBtn>
                <MypageDropDown isOpened={isOpened} />
              </div>
            </>
          ) : (
            !currPage.startsWith('/seller') && (
              <SellerBtn
                width='168px'
                fontWeight='400'
                onClick={handleSellerBtnClick}
              >
                <img src={ShoppingBagImg} alt='' />
                판매자 센터
              </SellerBtn>
            )
          )}
        </HeaderSection>
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

export const HeaderSection = styled.section`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const HeaderBox = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  display: flex;
  justify-content: space-between;

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
  }

  & .header-right {
    a {
      text-align: center;
      padding: 0;
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
  a + div {
    position: relative;
  }
`;

const MyPageBtn = styled.button`
  p {
    margin-top: -2px;
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 2px 10px;
    span {
      color: #000;
      font-weight: 700;
    }
  }

  &:hover {
    img {
      filter: invert(44%) sepia(12%) saturate(1416%) hue-rotate(315deg)
        brightness(97%) contrast(95%);
    }
    &,
    span {
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
