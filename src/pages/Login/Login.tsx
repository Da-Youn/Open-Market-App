import { Link } from 'react-router-dom';

import LoginForm from 'src/components/Login/LoginForm';

import * as S from './LoginStyle';
import BrickLogo from '../../assets/logo-brick.svg';
import FullLogo from '../../assets/logo-white-full.svg';

const Login = () => {
  return (
    <S.LoginWrap>
      <S.BannerSection>
        <img src={FullLogo} alt='로고' />
        <p>우리들의 오픈 마켓, 마켓 브릭 : )</p>
      </S.BannerSection>
      <S.LoginSection>
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
            아직 회원이 아니라면?<Link to='/account/signup'>회원가입</Link>
          </S.LinkWrap>
        </main>
      </S.LoginSection>
    </S.LoginWrap>
  );
};
export default Login;
