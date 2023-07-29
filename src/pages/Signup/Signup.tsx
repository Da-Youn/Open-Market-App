import React, { useState, ChangeEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { FormWrap } from '../../components/common/Form';
import TypeChange from 'src/components/common/TypeChange';
import CoralLogo from '../../assets/logo-coral.png';
import CheckOn from '../../assets/icon-check-on.svg';
import CheckOff from '../../assets/icon-check-off.svg';
import CheckBox from '../../assets/check-box.svg';
import CheckBoxFilled from '../../assets/check-fill-box.svg';
import DownArrow from '../../assets/icon-down-arrow.svg';
import UpArrow from '../../assets/icon-up-arrow.svg';
import SignupForm from 'src/components/common/Signup/SignupForm';
import { Input } from 'src/components/common/Input';
export interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [checkBoxFiiled, setCheckBoxFiiled] = useState<string>(CheckBox);
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckBoxFilled = () => {
    if (checked) {
      setChecked(false);
      setCheckBoxFiiled(CheckBox);
    } else {
      setChecked(true);
      setCheckBoxFiiled(CheckBoxFilled);
    }
  };

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
        <CheckWrap>
          <button onClick={handleCheckBoxFilled}>
            <img src={checkBoxFiiled} alt='체크박스' />{' '}
          </button>
          <p>
            호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에
            대한 내용을 확인하였고 동의합니다.
          </p>
        </CheckWrap>
        <Button type='submit' $maxWidth='480px' $mgTop='34px' $bdRadius='5px'>
          가입하기
        </Button>
      </main>
    </SignupWrap>
  );
};

const SignupWrap = styled.div`
  margin: 130px auto;
  padding: 0 25px;
  header,
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main {
    margin: auto;
    max-width: 550px;
  }

  h1 {
    margin-bottom: 70px;
    img {
      width: 268px;
    }
  }

  label {
    color: var(--sub-font-color);
    margin-bottom: 10px;
  }

  input,
  .phone-number {
    padding-left: 16px;
    height: 54px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
  }
`;

const CheckWrap = styled.div`
  display: flex;
  gap: 10px;
  color: var(--sub-font-color);

  span {
    font-weight: 700;
    text-decoration-line: underline;
  }
`;

const SignupButton = styled(Button)`
  width: 100%;
  max-width: 480px;
  padding: 16px 0;
  height: 60px;
  margin-top: 34px;
`;

export default Signup;
