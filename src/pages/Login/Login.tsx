import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormWrap, FormChangeBtn } from '../../components/common/Form';
import HoduLogo from '../../assets/logo-hodu.svg';
import {
  LoginWrap,
  FormChangeWrap,
  Input,
  LoginButton,
  LinkWrap,
} from './LoginStyle';

interface UserInput {
  username: string;
  password: string;
  login_type: 'BUYER' | 'SELLER';
}

export default function Login() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<UserInput>({
    username: '',
    password: '',
    login_type: 'BUYER',
  });
  let [idError, setIdError] = useState(false);
  let [pwError, setPwError] = useState(false);
  let [loginError, setLoginError] = useState('');

  const handleBuyerLogin = () => {
    setUserInput({
      ...userInput,
      login_type: 'BUYER',
    });
  };

  const handleSellerLogin = () => {
    setUserInput({
      ...userInput,
      login_type: 'SELLER',
    });
  };

  const handleLoginCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) {
      setUserInput({
        ...userInput,
        username: e.target.value.trim(),
      });
      setIdError(false);
    } else {
      setIdError(true);
    }
  };

  const handlePassWordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) {
      setUserInput({
        ...userInput,
        password: e.target.value.trim(),
      });
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (idError || pwError) {
      return;
    }

    try {
      const response = await fetch(
        'https://openmarket.weniv.co.kr/accounts/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...userInput }),
        },
      );
      const json = await response.json();
      console.log(response, json);

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
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <LoginWrap>
      <h1>
        <Link to='/'>
          <img src={HoduLogo} alt='호두 로고 이미지' />
        </Link>
      </h1>
      <FormChangeWrap>
        <h2 className='a11y-hidden'>회원 종류 선택하기</h2>
        <FormChangeBtn
          className={`form-btn ${
            userInput.login_type === 'BUYER' ? '' : 'disable'
          }`}
          type='button'
          onClick={handleBuyerLogin}
        >
          구매회원 로그인
        </FormChangeBtn>
        <FormChangeBtn
          className={`form-btn ${
            userInput.login_type === 'SELLER' ? '' : 'disable'
          }`}
          type='button'
          onClick={handleSellerLogin}
        >
          판매회원 로그인
        </FormChangeBtn>
      </FormChangeWrap>
      <FormWrap onSubmit={handleLoginSubmit}>
        <Input
          type='text'
          placeholder='아이디'
          onBlur={handleLoginCheck}
          borderColor={
            idError ? 'var(--error-font-color)' : 'var(--border-color)'
          }
        />
        {idError && <p>아이디를 입력해 주세요.</p>}
        <Input
          type='password'
          placeholder='비밀번호'
          onBlur={handlePassWordCheck}
          borderColor={
            pwError ? 'var(--error-font-color)' : 'var(--border-color)'
          }
        />
        {pwError && <p>비밀번호를 입력해 주세요.</p>}
        {loginError && <p>{loginError}</p>}

        <label className='input-error hidden'></label>
        <LoginButton className='login-btn' type='submit'>
          로그인
        </LoginButton>
      </FormWrap>
      <LinkWrap>
        <a>회원가입</a>
        <p>|</p>
        <a>비밀번호 찾기</a>
      </LinkWrap>
    </LoginWrap>
  );
}
