import { Link } from 'react-router-dom';

import SignupForm from '../../components/Signup/SignupForm/SignupForm';

import * as S from './SignupStyle';
import BrickLogo from '../../assets/logo-brick.svg';
import FullLogo from '../../assets/logo-white-full.svg';
const Signup = () => {
  return (
    <S.SignupWrap>
      <S.BannerSection>
        <img src={FullLogo} alt='로고' />
        <p>우리들의 오픈 마켓, 마켓 브릭 : )</p>
      </S.BannerSection>
      <S.SignupSection>
        <header>
          <h1>
            <Link to='/'>
              <img src={BrickLogo} alt='호두 로고 이미지' />
            </Link>
          </h1>
        </header>
        <main>
          <SignupForm />
        </main>
      </S.SignupSection>
    </S.SignupWrap>
  );
};

export default Signup;
