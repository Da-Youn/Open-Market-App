import styled from 'styled-components';

export const Input = styled.input`
  max-width: ${(props: { maxWidth: string }) => props.maxWidth || '480px'};
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height || '54px'};
  padding: ${(props: { padding: string }) => props.padding};
  border-width: ${(props: { $borderWidth: string }) =>
    props.$borderWidth || 'none'};
  border-style: solid;
  border-color: ${(props: { $isError: boolean; $isActive: boolean }) =>
    props.$isError
      ? 'var(--error-color)'
      : props.$isActive
      ? 'var(--main-color)'
      : 'var(--border-color)'};
  border-radius: ${(props: { $bdRadius: string }) => props.$bdRadius || 'none'};
  margin-bottom: ${(props: { $mgBottom: string }) => props.$mgBottom || '10px'};

  &::placeholder {
    font-size: 16px;
    color: var(--sub-font-color);
  }
`;
