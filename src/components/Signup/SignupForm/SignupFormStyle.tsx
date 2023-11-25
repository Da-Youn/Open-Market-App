import styled from 'styled-components';

export const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormBox = styled.div`
  width: 100%;
  padding: 34px 35px 36px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: -15px 0 30px;
  border: 1px solid var(--border-color);
  background-color: var(--white);
  gap: 40px;
  label {
    color: var(--sub-font-color);
  }
`;

export const AccountInfoWrap = styled.div`
  width: 100%;
  min-width: 230px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

export const CheckWrap = styled.div`
  display: flex;
  gap: 10px;
  color: var(--sub-font-color);

  span {
    font-weight: 700;
    text-decoration-line: underline;
  }
`;
