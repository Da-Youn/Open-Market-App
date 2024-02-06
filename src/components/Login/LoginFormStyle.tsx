import styled from 'styled-components';
import CheckIcon from 'src/assets/icon-check.svg';

const LoginFormWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
`;

const FormBox = styled.form`
  width: 100%;
  padding: 34px 35px 36px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;
  margin: -15px 0 50px;
  border: 1px solid var(--border-color);
  background-color: var(--white);
  font-weight: 500;
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ErrorMsg = styled.p`
  margin-top: 10px;
  margin-bottom: 6px;
  color: var(--error-color);
`;

const ValidMsg = styled.p`
  margin-top: 10px;
  margin-bottom: 6px;
  color: var(--main-color);
`;

const AutoLogin = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1.5px solid var(--border-color);
    margin-right: 6px;
    border-radius: 0.35rem;
    cursor: pointer;
    &:checked {
      border-color: transparent;
      background-image: url(${CheckIcon});
      background-size: 80% 80%;
      background-position: 50%;
      background-repeat: no-repeat;
      border: 1.5px solid var(--border-color);
      transition: 0.3s;
    }
  }
`;

export { LoginFormWrap, FormBox, ErrorMsg, ValidMsg, AutoLogin };
