import styled from 'styled-components';

const FormWrap = styled.form`
  width: 550px;
  padding: 34px 35px 36px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: -15px 0 30px;
  border: 1px solid var(--border-color);
  background-color: var(--primary-color);

  p {
    margin-bottom: 6px;
    color: var(--error-font-color);
  }
`;

const FormChangeBtn = styled.button`
  font-size: var(--font-md);
  z-index: 100;

  &.form-btn {
    width: 275px;
    height: 70px;
    border-top: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-radius: 10px 10px 0 0;
    padding: 20px 0 38px;
    font-weight: 700;
    background-color: var(--primary-color);
  }

  &.disable {
    background-color: var(--sub-color);
    border-bottom: 1px solid var(--border-color);
  }
`;
export { FormWrap, FormChangeBtn };
