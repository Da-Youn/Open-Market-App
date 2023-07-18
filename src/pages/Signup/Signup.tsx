import React, { useState, ChangeEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { FormWrap } from '../../components/common/Form';
import FormChange from 'src/components/common/TypeChange';
import HoduLogo from '../../assets/logo-hodu.svg';
import CheckOn from '../../assets/icon-check-on.svg';
import CheckOff from '../../assets/icon-check-off.svg';
import CheckBox from '../../assets/check-box.svg';
import CheckBoxFilled from '../../assets/check-fill-box.svg';
import DownArrow from '../../assets/icon-down-arrow.svg';
import UpArrow from '../../assets/icon-up-arrow.svg';
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
  const [arrowChange, setArrowChange] = useState<string>(DownArrow);
  const [checkBoxFiiled, setCheckBoxFiiled] = useState<string>(CheckBox);
  const [checked, setChecked] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [firstPhoneNum, setFirstPhoneNum] = useState<string>('010');

  const handleDropdownView = () => {
    if (view) {
      setArrowChange(DownArrow);
      setView(false);
    } else {
      setArrowChange(UpArrow);
      setView(true);
    }
  };

  const handleCheckBoxFilled = () => {
    if (checked) {
      setChecked(false);
      setCheckBoxFiiled(CheckBox);
    } else {
      setChecked(true);
      setCheckBoxFiiled(CheckBoxFilled);
    }
  };

  const handleFirstPhonNumChange: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setFirstPhoneNum(e.currentTarget.innerHTML);
    handleDropdownView();
  };

  const handleMaxlength = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 4) {
      e.target.value = value.slice(0, 4);
    }
  };
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
                <FirstNumber>
                  <button
                    type='button'
                    onClick={handleDropdownView}
                    className='phone-number'
                  >
                    <span>{firstPhoneNum}</span>
                    <img src={arrowChange} alt='' />
                  </button>
                  {view && (
                    <ul className='selectbox-option hide'>
                      <li>
                        <button
                          onClick={handleFirstPhonNumChange}
                          type='button'
                        >
                          010
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleFirstPhonNumChange}
                          type='button'
                        >
                          011
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleFirstPhonNumChange}
                          type='button'
                        >
                          016
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleFirstPhonNumChange}
                          type='button'
                        >
                          017
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleFirstPhonNumChange}
                          type='button'
                        >
                          019
                        </button>
                      </li>
                    </ul>
                  )}
                </FirstNumber>
                <input type='tel' onInput={handleMaxlength} />
                <input type='tel' onInput={handleMaxlength} />
              </div>
            </PhoneNumberInput>
          </UserInfoWrap>
        </FormWrap>
        <CheckWrap>
          <button onClick={handleCheckBoxFilled}>
            <img src={checkBoxFiiled} alt='체크박스' />{' '}
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
  margin: 130px auto;
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

  input,
  .phone-number {
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
    input,
    .phone-number {
      width: 100%;
    }
  }

  .phone-number {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-right: 14px;

    span {
      flex: 9;
    }
    img {
      flex: 1;
      vertical-align: bottom;
    }
  }
`;

const FirstNumber = styled.div`
  position: relative;
  width: 100%;
  ul {
    text-align: center;
    height: 150px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background-color: var(--primary-color);
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
        color: var(--primary-color);
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
