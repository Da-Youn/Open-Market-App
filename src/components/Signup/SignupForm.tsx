import React from 'react';
import { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import { axiosInstance } from 'src/api/axiosInstance';

import Input from '../common/Input';
import Button from '../common/Button';
import TypeChange from '../common/TypeChange';
import { FormWrap, ErrorMsg, ValidMsg } from '../common/Form';

import UpArrow from '../../assets/icon-up-arrow.svg';
import DownArrow from '../../assets/icon-down-arrow.svg';
import CheckOn from '../../assets/icon-check-on.svg';
import CheckOff from '../../assets/icon-check-off.svg';
import CheckBox from '../../assets/check-box.svg';
import CheckBoxFilled from '../../assets/check-fill-box.svg';

import {
  AccountInfoWrap,
  IdInput,
  PasswordInput,
  UserInfoWrap,
  NameInput,
  PhoneNumberInput,
  FirstNumberWrap,
  FirstNumberDropBtn,
  SellerInfoWrap,
  RegNumberInput,
  CheckWrap,
} from '../../pages/Signup/SignupStyle';
export interface SignupFormProps {}

interface UserInput {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
  company_registration_number?: string;
  store_name?: string;
}

type PhoneNumState = [string, string, string];

const SignupForm = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<UserInput>({
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    name: '',
  });
  const [userType, setUserType] = useState<string>('BUYER');
  const [idValid, setIdValid] = useState<string>('');
  const [idError, setIdError] = useState<string>('');
  const [pwValid, setPwValid] = useState<string>(CheckOff);
  const [pwError, setPwError] = useState<string>('');
  const [pw2Valid, setPw2Valid] = useState<string>(CheckOff);
  const [pw2Error, setPw2Error] = useState<string>('');
  const [phoneNum, setPhoneNum] = useState<PhoneNumState>(['010', '', '']);
  const [phoneNumError, setPhoneNumError] = useState<string>('');
  const [dropdownView, setDropdownView] = useState<boolean>(false);
  const [arrowChange, setArrowChange] = useState<string>(DownArrow);
  const [regNumError, setRegNumError] = useState<string>('');
  const [regNumValid, setRegNumValid] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [checkBoxFiiled, setCheckBoxFiiled] = useState<string>(CheckBox);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const handleCheckBoxFilled = () => {
    if (checked) {
      setChecked(false);
      setCheckBoxFiiled(CheckBox);
    } else {
      setChecked(true);
      setCheckBoxFiiled(CheckBoxFilled);
    }
  };

  useEffect(() => {
    if (userType === 'SELLER') {
      setUserInput({
        username: userInput.username,
        password: userInput.password,
        password2: userInput.password2,
        phone_number: phoneNum.join(''),
        name: userInput.name,
        company_registration_number: '',
        store_name: '',
      });
      setRegNumError('');
    } else {
      setUserInput({
        username: userInput.username,
        password: userInput.password,
        password2: userInput.password2,
        phone_number: phoneNum.join(''),
        name: userInput.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, phoneNum]);

  useEffect(() => {
    const allValues = Object.values(userInput);
    if (
      !allValues.includes('') &&
      !idError &&
      !pwError &&
      !pw2Error &&
      !regNumError &&
      phoneNum.join('').length >= 10 &&
      checked
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput, phoneNum, checked]);

  //* username 할당
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      username: e.target.value,
    }));

    // 아이디 유효성 검사
    const reg = /^[a-zA-Z0-9]{1,20}$/;
    if (!reg.test(e.target.value)) {
      setIdError('아이디는 20자 이내의 영어 소문자/대문자/숫자만 설정 가능합니다.');
      setIdValid('');
      return;
    } else {
      setIdError('');
    }
  };

  //* password - 비밀번호 유효성검사 & (재확인 값 존재 시)재확인 값과 비교
  const handlePasswordValid = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      password: e.target.value,
    }));

    // 유효성검사
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!reg.test(e.target.value)) {
      setPwError('비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.');
      setPwValid(CheckOff);
    } else {
      setPwError('');
      setPwValid(CheckOn);
    }

    // 비밀번호 재확인 값과 비교
    if (userInput.password2 && e.target.value !== userInput.password2) {
      setPw2Error('비밀번호가 일치하지 않습니다.');
      setPw2Valid(CheckOff);
    } else if (userInput.password2 && e.target.value === userInput.password2) {
      setPw2Error('');
      setPw2Valid(CheckOn);
    }
  };

  //* password2 - 비밀번호 값과 비교
  const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      password2: e.target.value,
    }));

    // 비밀번호 값과 비교
    if (!userInput.password) {
      setPw2Error('비밀번호를 입력해 주세요.');
    } else if (userInput.password !== e.target.value) {
      setPw2Error('비밀번호가 일치하지 않습니다.');
      setPw2Valid(CheckOff);
    } else if (userInput.password === e.target.value) {
      setPw2Error('');
      setPw2Valid(CheckOn);
    }
  };

  //* name 할당
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      name: e.target.value,
    }));
  };

  //* phone_number
  // 앞자리 번호 드롭다운
  const handleDropdownView = () => {
    if (dropdownView) {
      setArrowChange(DownArrow);
      setDropdownView(false);
    } else {
      setArrowChange(UpArrow);
      setDropdownView(true);
    }
  };

  const handleFirstPhoneNumChange: MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPhoneNum([e.currentTarget.innerText, phoneNum[1], phoneNum[2]]);
    handleDropdownView();
  };
  const handleSecondPhoneNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNum([phoneNum[0], e.target.value, phoneNum[2]]);
  };

  const handleLastPhoneNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNum([phoneNum[0], phoneNum[1], e.target.value]);
  };

  // 번호 입력가능 길이 4자리로 제한
  const handleMaxlength = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 4) {
      e.target.value = value.slice(0, 4);
    }
  };

  //* company_registration_number 할당
  const handleRegNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      company_registration_number: e.target.value,
    }));
  };

  //* store_name 할당
  const handleStoreNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      store_name: e.target.value,
    }));
  };

  //* API
  const handleCheckIDDuplicate: MouseEventHandler<HTMLButtonElement> = async () => {
    if (idError) {
      return;
    }
    try {
      const res = await axiosInstance.post(`/accounts/signup/valid/username/`, {
        username: userInput.username,
      });

      if (res.status === 202) {
        setIdError('');
        setIdValid(res.data.Success);
      }
    } catch (error) {
      setIdValid('');
      const axiosError = error as AxiosError<Record<string, any>>;
      console.log(axiosError.response);
      if (axiosError.response?.data?.FAIL_Message) {
        const failMsg = axiosError.response?.data?.FAIL_Message;
        if (failMsg === 'username 필드를 추가해주세요 :)') {
          setIdError('아이디를 입력해 주세요.');
        } else {
          setIdError(axiosError.response?.data?.FAIL_Message);
        }
      }
    }
  };

  const handleRegNumDuplicate: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await axiosInstance.post(`/accounts/signup/valid/company_registration_number/`, {
        company_registration_number: userInput.company_registration_number,
      });
      if (res.status === 202) {
        setRegNumError('');
        setRegNumValid(res.data.Success);
      }
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, any>>;
      const failMsg = axiosError.response?.data.FAIL_Message;
      if (failMsg === 'company_registration_number 필드를 추가해주세요 :)') {
        setRegNumError('사업자 등록번호를 입력해 주세요.');
      } else {
        setRegNumError(axiosError.response?.data.FAIL_Message);
      }
      console.log(axiosError.response?.data);
    }
  };

  const handleSubmitUserInput: MouseEventHandler<HTMLButtonElement> = async () => {
    // 가입하기 클릭 시 - 아이디 중복확인 되었는지 체크, 휴대폰번호 중복 체크

    if (!idValid) {
      setIdError('아이디 중복확인을 해주세요.');
      return;
    }
    try {
      const res = await axiosInstance.post(`/accounts/signup${userType === 'SELLER' ? '_seller' : ''}/`, userInput);

      if (res.status === 202) {
        alert('회원가입이 완료되었습니다 :)');
        navigate('/account/login');
      }
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, any>>;
      if (axiosError.response?.data.phone_number) {
        setPhoneNumError(axiosError.response?.data.phone_number.join(''));
      }
      console.error(error);
    }
  };

  return (
    <>
      <TypeChange userType={userType} setUserType={setUserType} page='가입' />
      <FormWrap>
        <AccountInfoWrap>
          <IdInput>
            <label htmlFor=''>아이디</label>
            <div>
              <Input
                $mgBottom='none'
                onChange={handleIdChange}
                $isError={idError}
                $padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
              />
              <Button
                width='auto'
                $padding='0 32px'
                fontSize='var(--font-sm)'
                fontWeight='500'
                onClick={handleCheckIDDuplicate}
              >
                중복확인
              </Button>
            </div>
            {idError && <ErrorMsg>{idError}</ErrorMsg>}
            {idValid && <ValidMsg>{idValid}</ValidMsg>}
          </IdInput>

          <PasswordInput $pwValid={pwValid}>
            <div>
              <label htmlFor=''>비밀번호</label>
              <Input
                $mgBottom='none'
                onChange={handlePasswordValid}
                $isError={pwError}
                $padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
              />
            </div>
            {pwError && <ErrorMsg>{pwError}</ErrorMsg>}
          </PasswordInput>
          <PasswordInput $pwValid={pw2Valid}>
            <div>
              <label htmlFor=''>비밀번호 재확인 </label>
              <Input
                $mgBottom='none'
                onChange={handlePasswordCheck}
                $isError={pw2Error}
                $padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
              />
            </div>
            {pw2Error && <ErrorMsg>{pw2Error}</ErrorMsg>}
          </PasswordInput>
        </AccountInfoWrap>

        <UserInfoWrap>
          <NameInput>
            <label htmlFor=''>이름</label>
            <Input
              onChange={handleNameChange}
              $mgBottom='none'
              $padding='0 0 0 16px'
              $borderWidth='1px'
              $bdRadius='5px'
            />
          </NameInput>
          <PhoneNumberInput>
            <label htmlFor=''>휴대폰번호</label>
            <div>
              <FirstNumberWrap>
                <FirstNumberDropBtn type='button' onClick={handleDropdownView}>
                  <span>{phoneNum[0]}</span>
                  <img src={arrowChange} alt='' />
                </FirstNumberDropBtn>
                {dropdownView && (
                  <ul className='selectbox-option hide'>
                    <li>
                      <button onClick={handleFirstPhoneNumChange} type='button'>
                        010
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhoneNumChange} type='button'>
                        011
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhoneNumChange} type='button'>
                        016
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhoneNumChange} type='button'>
                        017
                      </button>
                    </li>
                    <li>
                      <button onClick={handleFirstPhoneNumChange} type='button'>
                        019
                      </button>
                    </li>
                  </ul>
                )}
              </FirstNumberWrap>
              <Input
                onInput={handleMaxlength}
                onChange={handleSecondPhoneNumChange}
                width='100%'
                $mgBottom='none'
                $padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
                $isError={phoneNumError}
              />
              <Input
                onInput={handleMaxlength}
                onChange={handleLastPhoneNumChange}
                width='100%'
                $mgBottom='none'
                $padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
                $isError={phoneNumError}
              />
            </div>
            {phoneNumError && <ErrorMsg>{phoneNumError}</ErrorMsg>}
          </PhoneNumberInput>
        </UserInfoWrap>
        {userType === 'SELLER' && (
          <SellerInfoWrap>
            <RegNumberInput>
              <label htmlFor=''>사업자등록번호</label>
              <div>
                <Input
                  $mgBottom='none'
                  $padding='0 0 0 16px'
                  $borderWidth='1px'
                  $bdRadius='5px'
                  onChange={handleRegNumChange}
                  $isError={regNumError}
                />
                <Button
                  width='auto'
                  $padding='0 32px'
                  fontSize='var(--font-sm)'
                  fontWeight='500'
                  onClick={handleRegNumDuplicate}
                >
                  인증
                </Button>
              </div>
              {regNumError && <ErrorMsg>{regNumError}</ErrorMsg>}
              {regNumValid && <ValidMsg>{regNumValid}</ValidMsg>}
            </RegNumberInput>
            <div>
              <label htmlFor=''>스토어 이름</label>
              <Input
                $mgBottom='none'
                $padding='0 0 0 16px'
                $borderWidth='1px'
                $bdRadius='5px'
                onChange={handleStoreNameChange}
              />
            </div>
          </SellerInfoWrap>
        )}
      </FormWrap>
      <CheckWrap>
        <button onClick={handleCheckBoxFilled}>
          <img src={checkBoxFiiled} alt='체크박스' />{' '}
        </button>
        <p>
          호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 대한 내용을 확인하였고 동의합니다.
        </p>
      </CheckWrap>
      <Button
        type='submit'
        $maxWidth='480px'
        $mgTop='34px'
        $bdRadius='5px'
        disabled={btnDisabled}
        onClick={handleSubmitUserInput}
      >
        가입하기
      </Button>
    </>
  );
};

export default SignupForm;
