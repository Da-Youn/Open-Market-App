import { FieldError } from 'react-hook-form';
import * as S from './LoginFormStyle';

interface LoginErrorProps {
  idError: FieldError | undefined;
  pwError: FieldError | undefined;
  loginError: string;
}

const LoginError = (props: LoginErrorProps) => {
  return (
    <>
      {(props.idError || props.pwError || props.loginError) && (
        <S.ErrorMsg>
          {props.idError || props.pwError ? '아이디 또는 비밀번호를 입력해 주세요.' : props.loginError}
        </S.ErrorMsg>
      )}
    </>
  );
};

export default LoginError;
