interface SignupErrorProps {
  isError?: string;
  isValid?: string;
}

const SignupError = (props: SignupErrorProps) => {
  return (
    <>
      {props.isValid ? (
        <p>{props.isValid}</p>
      ) : props.isError ? (
        <p>{props.isValid}</p>
      ) : null}
    </>
  );
};

export default SignupError;
