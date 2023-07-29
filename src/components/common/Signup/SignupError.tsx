interface SignupErrorProps {
  isError?: string;
  isValid?: string;
}

const SignupError: React.FC<SignupErrorProps> = ({ isError, isValid }) => {
  return <>{isValid ? <p>{isValid}</p> : isError ? <p>{isValid}</p> : null}</>;
};

export default SignupError;
