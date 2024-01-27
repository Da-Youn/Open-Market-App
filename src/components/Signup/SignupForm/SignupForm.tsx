import { useEffect, useState, MouseEventHandler } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import { axiosInstance } from 'src/api/axiosInstance';

import Button from '../../common/Button';
import TypeChange from '../../common/TypeChange';
import { InputValues } from 'src/types/SignupTypes';
import SignupInput from '../SignupInput/SignupInput';
import PhoneNumInput from '../SignupInput/PhoneNumInput';
import { setSignupInputValues, getSignupInputValues } from 'src/util/handleDefaultValues';

import CheckBox from '../../../assets/check-box.svg';
import CheckBoxFilled from '../../../assets/check-fill-box.svg';
import * as S from './SignupFormStyle';
export interface useSignupFormProps {}

const SignupuseForm = (props: useSignupFormProps) => {
  const navigate = useNavigate();
  const idRegex = /^[a-zA-Z0-9]{1,20}$/;
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/;
  const RegNumRegex = /^[0-9]*$/;
  const [userType, setUserType] = useState<string>('BUYER');
  const [isIdValid, setIsIdValid] = useState<string | null>(null);
  const [isRegNumValid, setIsRegNumValid] = useState<string | undefined | null>(null);
  const [firstNum, setFirstNum] = useState('010');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkBoxFiiled, setCheckBoxFiiled] = useState<string>(CheckBox);

  const methods = useForm<InputValues>({
    defaultValues: setSignupInputValues(userType),
    mode: 'onChange',
  });

  const { formState, reset, clearErrors, setError, watch } = methods;
  const { isValid } = formState;

  const username = watch('username'); // password input의 값을 가져옴
  const companyRegNum = watch('company_registration_number'); // password input의 값을 가져옴

  useEffect(() => {
    reset(setSignupInputValues(userType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const handleCheckIDDuplicate: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await axiosInstance.post(`/accounts/signup/valid/username/`, {
        username: username,
      });

      if (res.status === 202) {
        clearErrors('username'); // 에러메시지 삭제
        setIsIdValid(username);
      }
    } catch (error) {
      setIsIdValid(null);
      const axiosError = error as AxiosError<Record<string, any>>;
      const failMsg = axiosError.response?.data?.FAIL_Message;

      if (axiosError.response?.data?.FAIL_Message) {
        if (failMsg === 'username 필드를 추가해주세요 :)') {
          setError('username', { type: 'required', message: '아이디를 입력해 주세요.' });
        } else {
          setError('username', { type: 'required', message: failMsg });
        }
      }
    }
  };

  const handleRegNumDuplicate: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await axiosInstance.post(`/accounts/signup/valid/company_registration_number/`, {
        company_registration_number: companyRegNum,
      });

      if (res.status === 202) {
        clearErrors('company_registration_number');
        setIsRegNumValid(companyRegNum);
      }
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, any>>;
      const failMsg = axiosError.response?.data.FAIL_Message;
      if (failMsg === 'company_registration_number 필드를 추가해주세요 :)') {
        setError('company_registration_number', { type: 'required', message: '사업자 등록번호를 입력해 주세요.' });
      } else {
        setError('company_registration_number', { type: 'required', message: failMsg });
      }
    }
  };

  const onSubmit = async (data: InputValues) => {
    // 가입하기 클릭 시 - 아이디 중복확인 되었는지 체크, 휴대폰번호 중복 체크

    if (username !== isIdValid) {
      setError('username', { type: 'required', message: '아이디 중복확인을 진행해 주세요.' });
      return;
    } else if (companyRegNum !== isRegNumValid) {
      setError('company_registration_number', { type: 'required', message: '사업자 등록번호 인증을 진행해 주세요.' });
      return;
    }
    const reqData = getSignupInputValues(data, userType, firstNum);

    try {
      const res = await axiosInstance.post(`/accounts/signup${userType === 'SELLER' ? '_seller' : ''}/`, reqData);
      if (res.status === 202 || res.status === 201) {
        alert('회원가입이 완료되었습니다 :)');
        navigate('/account/login');
      }
    } catch (error) {
      const axiosError = error as AxiosError<Record<string, any>>;
      if (axiosError.response?.data) {
        const errorMsg = Object.keys(axiosError.response.data);
        errorMsg.forEach((key: string) => {
          if (key in data) {
            setError(key as keyof InputValues, { type: 'required', message: axiosError.response?.data[key] });
          }
        });
      }
    }
  };

  const handleCheckBtnClick = () => {
    if (isChecked) {
      setIsChecked(false);
      setCheckBoxFiiled(CheckBox);
    } else {
      setIsChecked(true);
      setCheckBoxFiiled(CheckBoxFilled);
    }
  };

  return (
    <FormProvider {...methods}>
      <TypeChange userType={userType} setUserType={setUserType} page='가입' />
      <S.FormWrap>
        <S.FormBox onSubmit={methods.handleSubmit(onSubmit)}>
          <S.AccountInfoWrap>
            {/* 아이디 */}
            <SignupInput
              validation={{
                pattern: {
                  value: idRegex,
                  message: '아이디는 20자 이내의 영어 소문자/대문자/숫자만 설정 가능합니다.',
                },
                required: '아이디를 입력해 주세요.',
              }}
              name='username'
              label='아이디'
              btnactive='중복확인'
              onClick={handleCheckIDDuplicate}
              isValid={isIdValid}
            />
            {/* 비밀번호 */}
            <SignupInput
              validation={{
                pattern: {
                  value: pwRegex,
                  message: '비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.',
                },
                required: '비밀번호를 입력해 주세요.',
              }}
              name='password'
              label='비밀번호'
            />
            {/* 비밀번호 확인*/}
            <SignupInput
              validation={{
                validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
                required: '비밀번호 확인을 입력해 주세요.',
              }}
              name='password2'
              label='비밀번호 확인'
              isValid={
                watch('password').length > 0 && watch('password') === watch('password2') ? '비밀번호가 일치합니다.' : ''
              }
            />
          </S.AccountInfoWrap>
          <S.AccountInfoWrap>
            {/* 이름 */}
            <SignupInput
              validation={{
                required: '이름을 입력해 주세요.',
              }}
              name='name'
              label='이름'
            />
            {/*휴대폰 번호 */}
            <div>
              <PhoneNumInput label='휴대폰 번호' setFirstNum={setFirstNum} firstNum={firstNum} />
            </div>
          </S.AccountInfoWrap>
          {userType === 'SELLER' && (
            <S.AccountInfoWrap>
              {/* 사업자 등록번호 */}
              <SignupInput
                validation={{
                  pattern: {
                    value: RegNumRegex,
                    message: '등록 번호는 숫자로만 이뤄져야 합니다.',
                  },
                  required: '사업자 등록번호를 입력해 주세요.',
                }}
                name='company_registration_number'
                label='사업자 등록 번호'
                btnactive='인증'
                onClick={handleRegNumDuplicate}
                isValid={isRegNumValid}
              />
              {/* 스토어 이름 */}
              <SignupInput
                validation={{
                  required: '스토어 이름을 입력해 주세요.',
                }}
                name='store_name'
                label='스토어 이름'
              />
            </S.AccountInfoWrap>
          )}
        </S.FormBox>
        <S.CheckWrap $color={isChecked ? ' var(--main-color)' : 'var(--sub-font-color)'}>
          <button type='button' onClick={handleCheckBtnClick}>
            <img src={checkBoxFiiled} alt='체크박스' />
          </button>
          <p>
            호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 대한 내용을 확인하였고 동의합니다.
          </p>
        </S.CheckWrap>
        <Button
          type='submit'
          $mgTop='34px'
          $bdRadius='5px'
          $boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.2)'
          disabled={isChecked && isValid ? false : true}
        >
          가입하기
        </Button>
      </S.FormWrap>
    </FormProvider>
  );
};

export default SignupuseForm;
