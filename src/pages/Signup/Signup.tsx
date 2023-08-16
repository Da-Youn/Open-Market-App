import React from 'react';
import { Link } from 'react-router-dom';
import CoralLogo from '../../assets/logo-coral.png';
import SignupForm from '../../components/Signup/SignupForm';
import { SignupWrap } from './SignupStyle';
export interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  return (
    <SignupWrap>
      <header>
        <h1>
          <Link to='/'>
            <img src={CoralLogo} alt='호두 로고 이미지' />
          </Link>
        </h1>
      </header>
      <main>
        <SignupForm />
      </main>
    </SignupWrap>
  );
};

export default Signup;
