import styled from 'styled-components';

export const Input = styled.input`
  max-width: 480px;
  height: 60px;
  border-bottom: 1px solid
    ${(props: { $isError: boolean }) =>
      props.$isError ? 'var(--error-color)' : 'var(--border-color)'};
  margin-bottom: 10px;

  &::placeholder {
    font-size: 16px;
    color: var(--sub-font-color);
  }
`;
