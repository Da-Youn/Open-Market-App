import React, { useState, MouseEvent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import UpArrow from '../../../assets/icon-up-arrow.svg';
import DownArrow from '../../../assets/icon-down-arrow.svg';
import * as S from './SignupInputStyle';

export type SignupInputProps = {};

export interface PhoneNumDropDownProps {
  setFirstNum: React.Dispatch<React.SetStateAction<string>>;
  firstNum: string;
  label?: string;
  placeholder?: string;
}

const PhoneNumInput = (props: PhoneNumDropDownProps) => {
  const { label, placeholder } = props;
  const { setFirstNum, firstNum } = props;
  const [arrowChange, setArrowChange] = useState<string>(DownArrow);
  const [dropdownView, setDropdownView] = useState<boolean>(false);

  const {
    register,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const error = errors.phone_number;

  const secondNum = watch('secondNumber');
  const lastNum = watch('lastNumber');

  const handleDropdownView = () => {
    if (dropdownView) {
      setArrowChange(DownArrow);
      setDropdownView(false);
    } else {
      setArrowChange(UpArrow);
      setDropdownView(true);
    }
  };

  useEffect(() => {
    if (error) {
      clearErrors('phone_number');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondNum, lastNum]);

  const handleFirstPhoneNumChange = (e: MouseEvent<HTMLButtonElement>) => {
    setFirstNum(e.currentTarget.value);
    handleDropdownView();
  };

  return (
    <S.SignupInputWrap>
      <label>{label}</label>
      <S.InputBox>
        <S.FirstNumWrap>
          <S.FirstNumDropBtn type='button' onClick={handleDropdownView}>
            <span>{firstNum}</span>
            <img src={arrowChange} alt='' />
          </S.FirstNumDropBtn>
          {dropdownView && (
            <ul className='selectbox-option hide'>
              <li>
                <button name='firstNum' value='010' onClick={handleFirstPhoneNumChange} type='button'>
                  010
                </button>
              </li>
              <li>
                <button value='011' onClick={handleFirstPhoneNumChange} type='button'>
                  011
                </button>
              </li>
              <li>
                <button value='016' onClick={handleFirstPhoneNumChange} type='button'>
                  016
                </button>
              </li>
              <li>
                <button value='017' onClick={handleFirstPhoneNumChange} type='button'>
                  017
                </button>
              </li>
              <li>
                <button value='019' onClick={handleFirstPhoneNumChange} type='button'>
                  019
                </button>
              </li>
            </ul>
          )}
        </S.FirstNumWrap>
        <S.PhoneNumInputStyle
          {...register('secondNumber', { required: true })}
          type='text'
          maxLength='4'
          name='secondNumber'
          placeholder={placeholder || ''}
          $border={error && error?.message !== '' ? 'var(--error-color)' : 'var(--border-color)'}
          $outline={error && error?.message !== '' ? 'var(--error-color)' : 'var(--point-color)'}
        />
        <S.PhoneNumInputStyle
          {...register('lastNumber', { required: true })}
          type='text'
          maxLength='4'
          name='lastNumber'
          placeholder={placeholder || ''}
          $border={error && error?.message !== '' ? 'var(--error-color)' : 'var(--border-color)'}
          $outline={error && error?.message !== '' ? 'var(--error-color)' : 'var(--point-color)'}
        />
      </S.InputBox>
      {error && error?.message !== '' && <S.ErrorMsg>{error?.message?.toString()}</S.ErrorMsg>}
    </S.SignupInputWrap>
  );
};

export default PhoneNumInput;
