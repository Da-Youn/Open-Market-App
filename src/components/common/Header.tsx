import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import Button from './Button';
import SearchForm from './SearchForm';
import { media } from 'src/style/mediaQuery';
import MypageDropDown from './MypageDropDown';
import { getStorageItem } from 'src/util/handleStorageItem';

import UserIcon from '../../assets/icon-user.svg';
import BrickLogo from '../../assets/logo-brick.svg';
import MobileLogo from '../../assets/logo-brick-mobile.svg';
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
  const token = getStorageItem('token');
  const userName = getStorageItem('username');
  const userType = getStorageItem('user_type');

  const isLoggedIn = !!token;
  const [isOpened, setIsOpened] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width:768px)' });

  if (currPage.startsWith('/account')) return null;

  const handleBtnClick = () => {
    if (isOpened) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  };

  return (
    <HeaderLayout id={props.id} $padding={isMobile ? '0 10px' : '0 50px'}>
      <HeaderBox>
        <HeaderSection className='header-left' $gap={isMobile ? '6px' : '26px'}>
          <h1>
            <Link to='/'>
              <img
                src={isMobile ? MobileLogo : BrickLogo}
                alt='마켓브릭 로고 이미지'
                width={isMobile ? '40px' : '160px'}
              />
            </Link>
            {currPage.startsWith('/seller') && '판매자 센터'}
          </h1>
        </HeaderSection>
        {!currPage.startsWith('/seller') && (
          <HeaderSection className='header-center'>
            <SearchForm />
          </HeaderSection>
        )}
        <HeaderSection className='header-right'>
          {!isLoggedIn ? (
            <>
              <LinkBtn to='/account/login'>
                <img src={UserIcon} alt='유저 아이콘' />
                <p>로그인</p>
              </LinkBtn>
              <LinkBtn to='/account/signup'>
                <img src={SignupIcon} alt='회원가입 아이콘' />
                <p>회원가입</p>
              </LinkBtn>
            </>
          ) : userType === 'BUYER' ? (
            <>
              <LinkBtn to='/my/cart'>
                <img src={CartIcon} alt='장바구니 아이콘' />
                <p>장바구니</p>
              </LinkBtn>
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
              <>
                <SellerBtn to='/seller/dashboard'>
                  <img src={ShoppingBagImg} alt='' />
                  <p>판매자 센터</p>
                </SellerBtn>
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
  min-width: 360px;
  height: 90px;
  background-color: #fff;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props: { $padding: string }) => props.$padding};
  z-index: 100;
`;

export const HeaderBox = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

export const HeaderSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  &.header-left {
    gap: ${(props: { $gap: string }) => props.$gap};

    h1 {
      display: flex;
      margin-right: 4px;
      align-items: center;
      gap: 12px;
      font-size: 30px;
      font-weight: 700;
      ${media.tablet(`
        font-size: var(--font-lg);
      `)}

      img {
        width: ${(props: { width: string }) => props.width};
        vertical-align: bottom;
      }
    }
  }

  &.header-center {
    flex: 6;
  }

  &.header-right {
    gap: 16px;

    a + div {
      position: relative;
    }
    ${media.tablet(`
    a p,
    button p {
      display: none;
    }
      `)}
  }
`;

const LinkBtn = styled(Link)`
  text-align: center;
  padding: 0;
  color: var(--sub-font-color);

  &:hover {
    img {
      filter: invert(44%) sepia(12%) saturate(1416%) hue-rotate(315deg) brightness(97%) contrast(95%);
    }
    color: var(--main-color);
  }
`;

const SellerBtn = styled(Link)`
  width: 170px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  background-color: var(--main-color);
  border-radius: 10px;
  p {
    font-size: var(--font-md);
  }
  ${media.tablet(`
    width: 50px;
      `)}
`;

const MyPageBtn = styled.button`
  p {
    width: 90px;
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
      filter: invert(44%) sepia(12%) saturate(1416%) hue-rotate(315deg) brightness(97%) contrast(95%);
    }
    &,
    span {
      color: var(--main-color);
    }
  }
`;

export default Header;
