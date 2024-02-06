import styled from 'styled-components';

import { media } from 'src/style/mediaQuery';

export interface MyPageMenuBarProps {}

const MyPageMenuBar = (props: MyPageMenuBarProps) => {
  return (
    <MyPageMenuBarLayout>
      <ul>
        <li>
          <button type='button'>주문 목록</button>
        </li>
        <li>
          <button>구매 후기</button>
        </li>
        <li>
          <button>찜한 상품</button>
        </li>
        <li>
          <button>최근 본 상품</button>
        </li>
        <li>
          <button>계정 설정 </button>
        </li>
      </ul>
    </MyPageMenuBarLayout>
  );
};

const MyPageMenuBarLayout = styled.section`
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ul {
    border-top: 1.5px solid var(--border-color);
    border-bottom: 1.5px solid var(--border-color);
    width: 100%;

    gap: 6px;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
  }

  li {
    position: relative;
  }

  ul button {
    width: 100%;
    height: 40px;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }

  span {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    color: var(--white);
    border-radius: 50%;
    background-color: var(--point-color);
  }

  li:first-child button {
    background: var(--point-color);
    color: var(--white);
    span {
      background: var(--white);
      color: var(--point-color);
    }
  }

  li button:not(li:first-child button):hover {
    background: var(--hover-color);
  }
  ${media.tablet(`
    max-width: 100%;
      `)}
`;

export default MyPageMenuBar;
