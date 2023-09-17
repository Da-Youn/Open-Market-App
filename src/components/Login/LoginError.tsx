import { ErrorMsg } from '../common/Form';

interface LoginErrorProps {
  idError: boolean;
  pwError: boolean;
  loginError: string;
}

const LoginError = (props: LoginErrorProps) => {
  return (
    <>
      {(props.idError || props.pwError || props.loginError) && (
        <ErrorMsg>
          {props.idError || props.pwError
            ? '아이디 또는 비밀번호를 입력해 주세요.'
            : props.loginError}
        </ErrorMsg>
      )}
    </>
  );
};

export default LoginError;
