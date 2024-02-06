import React, { ChangeEvent, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface InputProps {
  id?: string;
  type?: string;
  value?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
  $padding?: string;
  $borderWidth?: string;
  $bdRadius?: string;
  $mgBottom?: string;
  $isError?: FieldError;
  $isActive?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.RefObject<HTMLInputElement>;
}

const Input = forwardRef(({ type, placeholder, defaultValue, $isError, $borderWidth, ...rest }: InputProps, ref) => {
  return (
    <InputStyle
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      $borderWidth={$borderWidth}
      $isError={$isError}
      autoComplete='current-password'
      {...rest}
    />
  );
});

export const InputStyle = styled.input<InputProps>`
  transition: 0.3s;
  margin-top: 8px;
  max-width: ${(props: { maxWidth: string }) => props.maxWidth || '480px'};
  width: ${(props: { width: string }) => props.width || '100%'};
  height: ${(props: { height: string }) => props.height || '48px'};
  padding: ${(props: { $padding: string }) => props.$padding};
  border-width: ${(props: { $borderWidth: string }) => props.$borderWidth || 'none'};
  border-style: solid;
  border-color: ${(props: { $isError: string; $isActive: string }) =>
    props.$isError ? 'var(--error-color)' : props.$isActive ? 'var(--point-color)' : 'var(--border-color)'};
  border-radius: ${(props: { $bdRadius: string }) => props.$bdRadius || 'none'};
  margin-bottom: ${(props: { $mgBottom: string }) => props.$mgBottom || '10px'};

  &:focus {
    border-color: var(--point-color);
  }

  &::placeholder {
    font-size: 16px;
    color: var(--sub-font-color);
  }
`;

export default Input;
