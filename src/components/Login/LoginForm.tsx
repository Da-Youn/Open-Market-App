import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AxiosError } from 'axios';
import { axiosInstance } from 'src/api/axiosInstance';

import Input from '../common/Input';
import Button from '../common/Button';
import LoginError from './LoginError';
import { FormWrap } from '../common/Form';
import TypeChange from '../common/TypeChange';
import CheckIcon from 'src/assets/icon-check.svg';

interface UserInput {
  username: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [idError, setIdError] = useState<boolean>(false);
  const [pwError, setPwError] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [userInput, setUserInput] = useState<UserInput>({
    username: 'buyer1',
    password: 'hodu0910',
  });
  const [userType, setUserType] = useState<string>('BUYER');

  const handleAutoLogin = () => {
    if (autoLogin === true) {
      setAutoLogin(false);
    } else {
      setAutoLogin(true);
    }
  };

  const handleIDInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      username: e.target.value.trim(),
    }));
  };

  const handlePWInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      password: e.target.value.trim(),
    }));
  };

  const handleLoginCheck = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIdError(userInput.username ? false : true);
    setPwError(userInput.password ? false : true);

    if (userInput.username && userInput.password) handleLoginSubmit();
  };

  async function handleLoginSubmit() {
    try {
      const res = await axiosInstance.post(`/accounts/login/`, {
        ...userInput,
        login_type: userType,
      });

      if (res.status >= 200 && res.status < 300) {
        if (autoLogin) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user_type', res.data.user_type);
          localStorage.setItem('username', userInput.username);
        } else {
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('user_type', res.data.user_type);
          sessionStorage.setItem('username', userInput.username);
        }
        alert(`${userInput.username}님, 반갑습니다.`);
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, any>>;
      setLoginError(axiosError.response?.data?.FAIL_Message);
    }
  }

  return (
    <>
      <TypeChange userType={userType} setUserType={setUserType} setUserInput={setUserInput} page='login' />
      <FormWrap onSubmit={handleLoginCheck}>
        <Input
          type='text'
          placeholder='아이디'
          value={userInput.username}
          onChange={handleIDInput}
          $isError={idError}
          $borderWidth='0 0 1px 0'
        />
        <Input
          type='password'
          placeholder='비밀번호'
          value={userInput.password}
          onChange={handlePWInput}
          $isError={pwError}
          $borderWidth='0 0 1px 0'
        />
        <LoginError idError={idError} pwError={pwError} loginError={loginError} />
        <AutoLogin>
          <input type='checkbox' checked={autoLogin} onChange={handleAutoLogin} /> <p>자동 로그인</p>
        </AutoLogin>
        <label className='input-error hidden'></label>
        <Button type='submit' $mgTop='20px' $bdRadius='5px'>
          로그인
        </Button>
      </FormWrap>
    </>
  );
};

const AutoLogin = styled.label`
  display: flex;
  align-items: center;
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1.5px solid var(--main-color);
    margin-right: 6px;
    border-radius: 0.35rem;
    cursor: pointer;
    &:checked {
      border-color: transparent;
      background-image: url(${CheckIcon});
      background-size: 80% 80%;
      background-position: 50%;
      background-repeat: no-repeat;
      border: 1.5px solid var(--main-color);
    }
  }
`;

export default LoginForm;
