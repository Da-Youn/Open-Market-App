import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DropdownImg from 'src/assets/mypage_dropdown.svg';

export interface MypageDropDownProps {
  isOpened: boolean;
}

const MypageDropDown = ({ isOpened }: MypageDropDownProps) => {
  const navigate = useNavigate();

  const handleMyPageBtnClick = () => {
    navigate('/my/page');
  };

  const handleLogoutBtnClick = () => {
    localStorage.removeItem('user_type');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <MypageDropDownLayout display={isOpened ? 'flex' : 'none'}>
      <button onClick={handleMyPageBtnClick}>마이페이지</button>
      <button onClick={handleLogoutBtnClick}>로그아웃</button>
    </MypageDropDownLayout>
  );
};

const MypageDropDownLayout = styled.div`
  gap: 10px;
  width: 130px;
  height: 130px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: ${(props: { display: string }) => props.display};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;

  background: url(${DropdownImg}) 0 0 / contain no-repeat;
  button {
    width: 100px;
    height: 20px;
    padding: 5px 0;
    border-radius: 10px;
    box-sizing: content-box;
    color: var(--sub-font-color);
    border: 1px solid transparent;
  }
  button:hover {
    color: var(--font-color);
    border: 1px solid var(--border-color);
  }
`;

export default MypageDropDown;
