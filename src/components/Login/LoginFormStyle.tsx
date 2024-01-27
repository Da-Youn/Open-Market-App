import styled from 'styled-components';

const FormWrap = styled.form`
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

export { FormWrap, ErrorMsg, ValidMsg };
