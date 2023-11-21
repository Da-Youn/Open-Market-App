import styled from 'styled-components';

const SignupWrap = styled.div`
  margin: 0px auto 130px;
  padding: 0 25px;
  header,
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main {
    margin: auto;
    max-width: 550px;
  }

  h1 {
    margin-bottom: 70px;
    img {
      width: 268px;
    }
  }

  label {
    color: var(--sub-font-color);
    margin-bottom: 10px;
  }
`;

const AccountInfoWrap = styled.div`
  width: 100%;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  div {
    display: flex;
    flex-direction: column;
  }
`;
const IdInput = styled.div`
  div {
    width: 100%;
    gap: 12px;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    input {
      flex-grow: 1;
    }
  }
`;
const PasswordInput = styled.div`
  position: relative;

  &::after {
    content: '';
    width: 28px;
    height: 28px;
    background-image: url(${(props: { $pwValid: string }) => props.$pwValid});
    position: absolute;
    right: 10px;
    top: 40px;
  }
`;
const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
  }
`;
const NameInput = styled.div``;
const PhoneNumberInput = styled.div`
  div {
    flex-direction: row;
    gap: 12px;
  }
`;

const FirstNumberWrap = styled.div`
  position: relative;
  width: 100%;
  ul {
    text-align: center;
    height: 150px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background-color: var(--white);
    overflow-y: scroll;
    width: 100%;
    left: 0;
    top: 60px;

    li {
      button {
        width: 100%;
        padding: 5px 0;
      }
      button:hover {
        background-color: var(--main-color);
        color: var(--white);
      }
    }
  }

  ul::-webkit-scrollbar {
    background-color: var(--sub-color);
    width: 18px;
  }
  ul::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--border-color);
    background-clip: padding-box;
    border: 5px solid transparent;
  }
`;

const FirstNumberDropBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-right: 14px;
  width: 100%;
  span {
    flex: 9;
  }
  img {
    flex: 1;
    vertical-align: bottom;
  }

  padding-left: 16px;
  height: 54px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
`;

const SellerInfoWrap = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  div {
    display: flex;
    flex-direction: column;
  }
`;

const RegNumberInput = styled.div`
  div {
    gap: 12px;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    input {
      flex-grow: 1;
    }
  }
`;

const CheckWrap = styled.div`
  display: flex;
  gap: 10px;
  color: var(--sub-font-color);

  span {
    font-weight: 700;
    text-decoration-line: underline;
  }
`;

export {
  SignupWrap,
  AccountInfoWrap,
  IdInput,
  PasswordInput,
  UserInfoWrap,
  NameInput,
  PhoneNumberInput,
  FirstNumberWrap,
  FirstNumberDropBtn,
  SellerInfoWrap,
  RegNumberInput,
  CheckWrap,
};
