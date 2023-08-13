import React, { ReactNode, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';

interface InputProps {
  type?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
  $padding?: string;
  $borderWidth?: string;
  $bdRadius?: string;
  $mgBottom?: string;
  $isError?: string | boolean;
  $isActive?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, ...props }) => {
  return <InputStyle type={type ? type : 'text'} {...props} />;
};

export const InputStyle = styled.input<InputProps>`
  max-width: ${(props: { maxWidth: string }) => props.maxWidth || '480px'};
  width: ${(props: { width: string }) => props.width};
  height: ${(props: { height: string }) => props.height || '54px'};
  padding: ${(props: { $padding: string }) => props.$padding};
  border-width: ${(props: { $borderWidth: string }) =>
    props.$borderWidth || 'none'};
  border-style: solid;
  border-color: ${(props: { $isError: string; $isActive: string }) =>
    props.$isError
      ? 'var(--error-color)'
      : props.$isActive
      ? 'var(--main-color)'
      : 'var(--border-color)'};
  border-radius: ${(props: { $bdRadius: string }) => props.$bdRadius || 'none'};
  margin-bottom: ${(props: { $mgBottom: string }) => props.$mgBottom || '10px'};

  &:focus {
    border-color: var(--main-color);
  }

  &::placeholder {
    font-size: 16px;
    color: var(--sub-font-color);
  }
`;

export default Input;
