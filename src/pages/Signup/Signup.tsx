import { Link } from 'react-router-dom';

import SignupForm from '../../components/Signup/SignupForm/SignupForm';

import * as S from './SignupStyle';
import BrickLogo from '../../assets/logo-brick.svg';

const Signup = () => {
  return (
    <S.SignupWrap>
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
    </S.SignupWrap>
  );
};

export default Signup;
