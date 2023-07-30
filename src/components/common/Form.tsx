import styled from 'styled-components';

const FormWrap = styled.form`
  width: 100%;
  padding: 34px 35px 36px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: -15px 0 30px;
  border: 1px solid var(--border-color);
  background-color: var(--white);
`;

const ErrorMsg = styled.p`
  margin-bottom: 6px;
  color: var(--error-color);
`;

const ValidMsg = styled.p`
  margin-bottom: 6px;
  color: var(--main-color);
`;

export { FormWrap, ErrorMsg, ValidMsg };
