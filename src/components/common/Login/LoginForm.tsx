import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormWrap } from '../../../components/common/Form';
import { Input } from '../Input';
import TypeChange from '../TypeChange';
import LoginError from './LoginError';
import Button from '../Button';
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
  const [loginType, setLoginType] = useState<string>('BUYER');

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
      const response = await fetch(
        'https://openmarket.weniv.co.kr/accounts/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...userInput, login_type: loginType }),
        },
      );
      const json = await response.json();

      if (response.ok) {
        alert(`${userInput.username}님, 반갑습니다.`);
        navigate('/');
      } else {
        if (
          json.FAIL_Message ===
          '로그인 정보가 없습니다. 로그인 유형을 학인해주세요.'
        ) {
          setLoginError('로그인 정보가 없습니다. 로그인 유형을 확인해주세요.');
        } else {
          setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      }
    } catch (error) {}
  }

  return (
    <>
      <TypeChange
        loginType={loginType}
        setLoginType={setLoginType}
        page='login'
      />
      <FormWrap onSubmit={handleLoginCheck}>
        <Input
          type='text'
          placeholder='아이디'
          onChange={handleIDInput}
          $isError={idError}
        />
        <Input
          type='password'
          placeholder='비밀번호'
          onChange={handlePWInput}
          $isError={pwError}
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
