import React, { useState, ChangeEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import TypeChange from '../TypeChange';
import { FormWrap } from '../Form';
import { Input } from '../Input';
import CheckOn from '../../../assets/icon-check-on.svg';
import CheckOff from '../../../assets/icon-check-off.svg';
import CheckBox from '../../../assets/check-box.svg';
import CheckBoxFilled from '../../../assets/check-fill-box.svg';
import DownArrow from '../../../assets/icon-down-arrow.svg';
import UpArrow from '../../../assets/icon-up-arrow.svg';
import { headerApi } from 'src/api/axiosInstance';
import { AxiosError } from 'axios';

export interface SignupFormProps {}

interface UserInput {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
}

const SignupForm: React.FC<SignupFormProps> = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    name: '',
  });
  const [loginType, setLoginType] = useState<string>('BUYER');
  const [arrowChange, setArrowChange] = useState<string>(DownArrow);
  const [dropdownView, setDropdownView] = useState<boolean>(false);
  const [firstPhoneNum, setFirstPhoneNum] = useState<string>('010');
  const [isIdValid, setIsIdValid] = useState<string>('');
  const [isIdError, setIsIdError] = useState<string>('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      username: e.target.value.trim(),
    }));
  };

  const handleDropdownView = () => {
    if (dropdownView) {
      setArrowChange(DownArrow);
      setDropdownView(false);
    } else {
      setArrowChange(UpArrow);
      setDropdownView(true);
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

  const checkIDDuplicate: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await headerApi.post(`/accounts/signup/valid/username/`, {
        username: userInput.username,
      });
      console.log(res);
      if (res.status === 202) {
        console.log(res.data.Success);
        setIsIdValid(res.data.Success);
      }
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, any>>;
      console.log(axiosError.response);
      if (axiosError.response?.data?.FAIL_Message) {
        setIsIdError(axiosError.response?.data?.FAIL_Message);
      }
    }
  };
  if (isIdError) console.log(isIdError);
  return (
    <>
      <TypeChange
        loginType={loginType}
        setLoginType={setLoginType}
        page='가입'
      />
      <FormWrap>
        <AccountInfoWrap>
          <IdInput>
            <label htmlFor=''>아이디</label>
            <div>
              <Input
                $mgBottom='none'
                onChange={handleUsernameChange}
                $isError={isIdError}
              />
              <Button
                width='auto'
                padding='0 32px'
                fontSize='var(--font-sm)'
                fontWeight='500'
                onClick={checkIDDuplicate}
              >
                중복확인
              </Button>
            </div>
          </IdInput>
          <PasswordInput>
            <label htmlFor=''>비밀번호</label>
            <Input type='password' $mgBottom='none' />
          </PasswordInput>
          <PasswordInput>
            <label htmlFor=''>비밀번호 재확인 </label>
            <Input type='password' $mgBottom='none' />
          </PasswordInput>
        </AccountInfoWrap>

        <UserInfoWrap>
          <NameInput>
            <label htmlFor=''>이름</label>
            <Input $mgBottom='none' />
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
                {dropdownView && (
                  <ul className='selectbox-option hide'>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        010
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        011
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        016
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        017
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhonNumChange} type='button'>
                        019
                      </button>
                    </li>
                  </ul>
                )}
              </FirstNumber>
              <Input type='tel' onInput={handleMaxlength} $mgBottom='none' />
              <Input type='tel' onInput={handleMaxlength} $mgBottom='none' />
            </div>
          </PhoneNumberInput>
        </UserInfoWrap>
      </FormWrap>
    </>
  );
};

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

export default SignupForm;
