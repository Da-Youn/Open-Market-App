import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { FormWrap } from '../../components/common/Form';
import FormChange from 'src/components/common/TypeChange';
import HoduLogo from '../../assets/logo-hodu.svg';
import CheckOn from '../../assets/icon-check-on.svg';
import CheckOff from '../../assets/icon-check-off.svg';
import CheckBox from '../../assets/check-box.svg';
import CheckFillBox from '../../assets/check-fill-box.svg';

export interface SignupProps {}

interface UserInput {
  username: string;
  password: string;
  login_type: 'BUYER' | 'SELLER';
}

const Signup: React.FC<SignupProps> = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    username: '',
    password: '',
    login_type: 'BUYER',
  });
  return (
    <SignupWrap>
      <header>
        <h1>
          <Link to='/'>
            <img src={HoduLogo} alt='호두 로고 이미지' />
          </Link>
        </h1>
      </header>
      <main>
        <FormChange userInput={userInput} setUserInput={setUserInput} />
        <FormWrap>
          <AccountInfoWrap>
            <IdInput>
              <label htmlFor=''>아이디</label>
              <div>
                <input type='text' />
                <button>중복확인</button>
              </div>
            </IdInput>
            <PasswordInput>
              <label htmlFor=''>비밀번호</label>
              <input type='password' />
            </PasswordInput>
            <PasswordInput>
              <label htmlFor=''>비밀번호 재확인 </label>
              <input type='password' />
            </PasswordInput>
          </AccountInfoWrap>

          <UserInfoWrap>
            <NameInput>
              <label htmlFor=''>이름</label>
              <input type='password' />
            </NameInput>
            <PhoneNumberInput>
              <label htmlFor=''>휴대폰번호</label>
              <div>
                <input type='number' />
                <input type='number' />
                <input type='number' />
              </div>
            </PhoneNumberInput>
          </UserInfoWrap>
        </FormWrap>
        <CheckWrap>
          <button>
            <img src={CheckBox} alt='체크박스' />{' '}
          </button>
          <p>
            호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에
            대한 내용을 확인하였고 동의합니다.
          </p>
        </CheckWrap>
        <SignupButton>가입하기</SignupButton>
      </main>
    </SignupWrap>
  );
};

const SignupWrap = styled.div`
  margin: 130px auto 0;
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
      width: 238px;
    }
  }

  label {
    color: var(--sub-font-color);
    margin-bottom: 10px;
  }

  input {
    padding-left: 16px;
    height: 54px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
  }
`;

const AccountInfoWrap = styled.div`
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
    gap: 12px;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    input {
      flex-grow: 1;
    }
  }
  button {
    box-sizing: border-box;
    height: 54px;
    padding: 0 32px;
    color: var(--primary-color);
    border-radius: 5px;
    background: var(--main-color);
  }
`;
const PasswordInput = styled.div`
  position: relative;

  &::after {
    content: '';
    width: 28px;
    height: 28px;
    background-image: url(${CheckOff});
    position: absolute;
    right: 10px;
    top: 50%;
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
    input {
      width: 100%;
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

const SignupButton = styled(Button)`
  width: 100%;
  max-width: 480px;
  padding: 16px 0;
  height: 60px;
  margin-top: 34px;
`;

export default Signup;
