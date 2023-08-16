import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormWrap } from '../common/Form';
import Input from '../common/Input';
import TypeChange from '../common/TypeChange';
import LoginError from './LoginError';
import Button from '../common/Button';
import { headerApi } from 'src/api/axiosInstance';
import { AxiosError } from 'axios';

interface UserInput {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [idError, setIdError] = useState<boolean>(false);
  const [pwError, setPwError] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [userInput, setUserInput] = useState<UserInput>({
    username: '',
    password: '',
  });
  const [userType, setUserType] = useState<string>('BUYER');

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
      const res = await headerApi.post(`/accounts/login/`, {
        ...userInput,
        login_type: userType,
      });

      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_type', res.data.user_type);
        localStorage.setItem('username', userInput.username);
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
      <TypeChange userType={userType} setUserType={setUserType} page='login' />
      <FormWrap onSubmit={handleLoginCheck}>
        <Input
          type='text'
          placeholder='아이디'
          onChange={handleIDInput}
          $isError={idError}
          $borderWidth='0 0 1px 0'
        />
        <Input
          type='password'
          placeholder='비밀번호'
          onChange={handlePWInput}
          $isError={pwError}
          $borderWidth='0 0 1px 0'
        />
        <LoginError
          idError={idError}
          pwError={pwError}
          loginError={loginError}
        />
        <label className='input-error hidden'></label>
        <Button type='submit' $mgTop='20px' $bdRadius='5px'>
          로그인
        </Button>
      </FormWrap>
    </>
  );
};

export default LoginForm;
