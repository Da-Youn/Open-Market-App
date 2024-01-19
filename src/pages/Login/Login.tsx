import { Link } from 'react-router-dom';

import LoginForm from 'src/components/Login/LoginForm';

import * as S from './LoginStyle';
import BrickLogo from '../../assets/logo-brick.svg';

const Login = () => {
  return (
    <S.LoginWrap>
      <header>
        <h1>
          <Link to='/'>
            <img src={BrickLogo} alt='호두 로고 이미지' />
          </Link>
        </h1>
      </header>
      <main>
        <LoginForm />
        <S.LinkWrap>
          <Link to='/account/signup'>회원가입</Link>
          <p>|</p>
          <a>비밀번호 찾기</a>
        </S.LinkWrap>
      </main>
    </S.LoginWrap>
  );
};
export default Login;
