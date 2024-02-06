import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import CheckOn from '../../../assets/icon-check-on.svg';
import CheckOff from '../../../assets/icon-check-off.svg';

import Button from '../../common/Button';
import { InputProps } from 'src/types/SignupTypes';

import * as S from './SignupInputStyle';

const SignupInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, label, placeholder, type, validation, isValid, btnactive, onClick } = props;

  const {
    register,
    watch,
    formState: { errors, dirtyFields },
  } = useFormContext();
  const error = errors[name];

  return (
    <S.SignupInputWrap>
      {label && <label htmlFor={name}>{label}</label>}
      <S.AuthInputBox>
        <S.InputStyle
          {...register(name, validation)}
          type={type || 'text'}
          id={name}
          name={name}
          placeholder={placeholder || ''}
          $border={error && error?.message !== '' ? 'var(--error-color)' : 'var(--border-color)'}
          $outline={error && error?.message !== '' ? 'var(--error-color)' : 'var(--point-color)'}
        />
        {name === 'password' && (
          <S.CheckIcon>
            <img src={!error && dirtyFields[name] ? CheckOn : CheckOff} alt='체크 이미지' />
          </S.CheckIcon>
        )}
        {name === 'password2' && (
          <S.CheckIcon>
            <img src={!error && dirtyFields[name] ? CheckOn : CheckOff} alt='체크 이미지' />
          </S.CheckIcon>
        )}
        {btnactive && (
          <Button
            onClick={onClick}
            $maxWidth='150px'
            $padding='0 32px'
            fontSize='var(--font-sm)'
            fontWeight='500'
            disabled={!dirtyFields[name] || error ? true : false} // 에러가 있고, 입력된 게 없고
          >
            {btnactive}
          </Button>
        )}
      </S.AuthInputBox>
      {error && error?.message !== '' && <S.ErrorMsg>{error?.message?.toString()}</S.ErrorMsg>}
      {!error && dirtyFields[name] && watch(name) === isValid && <S.ValidMsg>사용 가능한 {label}입니다.</S.ValidMsg>}
    </S.SignupInputWrap>
  );
});

export default SignupInput;
