import styled from 'styled-components';

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
    h1 {
      margin-right: 4px;

      img {
        width: 124px;
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
