import React, { ReactNode, ChangeEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: ReactNode;
  type?: string;
  $maxWidth?: string;
  width?: string;
  padding?: string;
  $mgTop?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  bgColor?: string;
  border?: string;
  $bdRadius?: string;
  $disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, type, ...props }) => {
  return (
    <ButtonStyle type={type ? type : 'button'} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<ButtonProps>`
  box-sizing: border-box;
  max-width: ${(props: { $maxWidth: string }) => props.$maxWidth};
  width: ${(props: { width: string }) => (props.width ? props.width : '100%')};
  margin-top: ${(props: { $mgTop: string }) => props.$mgTop || '0px'};
  padding: ${(props: { padding: string }) => props.padding || '19px 0'};
  color: ${(props: { color: string }) => props.color || 'var(--white)'};
  font-size: ${(props: { fontSize: string }) =>
    props.fontSize || 'var(--font-md)'};
  font-weight: ${(props: { fontWeight: string }) => props.fontWeight || '700'};
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor || 'var(--main-color)'};
  border: ${(props: { border: string }) => props.border || 'none'};
  border-radius: ${(props: { $bdRadius: string }) => props.$bdRadius || '5px'};

  ${(props: { $disabled: boolean }) => {
    props.$disabled &&
      styled`
      cursor: default;
      background-color: ${(props: { $disBgColor: string }) =>
        props.$disBgColor || 'var(--border-color)'};
      color: ${(props: { $disColor: string }) =>
        props.$disColor || 'var(--white)'};
         border: ${(props: { $disBorder: string }) =>
           props.$disBorder || 'none'};
    `;
  }}
`;

export default Button;
