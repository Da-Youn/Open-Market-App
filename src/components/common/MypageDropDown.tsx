import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'src/style/mediaQuery';
import { useMediaQuery } from 'react-responsive';
import HomeIcon from 'src/assets/icon-home.svg';
import LogoutIcon from 'src/assets/icon-logout.svg';
import { getStorageItem, removeStorageItem } from 'src/util/handleStorageItem';

import DropdownImg from 'src/assets/mypage_dropdown.svg';

export interface MypageDropDownProps {
  isOpened: boolean;
}

const MypageDropDown = ({ isOpened }: MypageDropDownProps) => {
  const navigate = useNavigate();
  const userType = getStorageItem('user_type');

  const isMobile = useMediaQuery({ query: '(max-width:768px)' });

  const handleMyPageBtnClick = () => {
    navigate('/my/page');
  };

  const handleLogoutBtnClick = () => {
    removeStorageItem('user_type');
    removeStorageItem('username');
    removeStorageItem('token');

    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <MypageDropDownLayout display={isOpened ? 'flex' : 'none'} height={userType === 'BUYER' ? '100px' : '40px'}>
      {userType === 'BUYER' && (
        <button onClick={handleMyPageBtnClick}>
          {isMobile && <img src={HomeIcon} alt='마이페이지 버튼 이미지' />}
          {!isMobile && <p>마이페이지</p>}
        </button>
      )}
      <button onClick={handleLogoutBtnClick}>
        {isMobile && <img src={LogoutIcon} alt='로그아웃 버튼 이미지' />}
        {!isMobile && <p>로그아웃</p>}
      </button>
    </MypageDropDownLayout>
  );
};

const MypageDropDownLayout = styled.div`
  gap: 10px;
  width: 100px;
  height: ${(props: { height: string }) => props.height};
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: ${(props: { display: string }) => props.display};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;

  box-shadow: 0px 1px 2px 0px rgba(118, 118, 118, 0.7);
  ${media.tablet(`
    width: 50px;
      `)}
  /* background: url(${DropdownImg}) 0 0 / 130px 50px no-repeat; */
  button {
    width: 90px;
    height: 20px;
    padding: 5px 0;
    border-radius: 10px;
    box-sizing: content-box;
    color: var(--sub-font-color);
    border: 1px solid transparent;
    ${media.tablet(`
    width: 40px;
      `)}
  }
  button:hover {
    color: var(--font-color);
    border: 1px solid var(--border-color);
    ${media.tablet(`
    border: 1px solid transparent;
      `)}
    img {
      filter: invert(44%) sepia(12%) saturate(1416%) hue-rotate(315deg) brightness(97%) contrast(95%);
    }
  }
`;

export default MypageDropDown;
