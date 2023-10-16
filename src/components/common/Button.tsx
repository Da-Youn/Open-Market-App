import { ReactNode, ChangeEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: ReactNode;
  type?: string;
  $minWidth?: string;
  $maxWidth?: string;
  width?: string;
  $padding?: string;
  $mgTop?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  $bgColor?: string;
  $border?: string;
  $bdRadius?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  return (
    <ButtonStyle type={props.type ? props.type : 'button'} {...props}>
      {props.children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<ButtonProps>`
  box-sizing: border-box;
  min-width: ${(props: { $minWidth: string }) => props.$minWidth};
  max-width: ${(props: { $maxWidth: string }) => props.$maxWidth};
  width: ${(props: { width: string }) => (props.width ? props.width : '100%')};
  margin-top: ${(props: { $mgTop: string }) => props.$mgTop || '0px'};
  padding: ${(props: { $padding: string }) => props.$padding || '19px 0'};
  color: ${(props: { color: string }) => props.color || 'var(--white)'};
  font-size: ${(props: { fontSize: string }) =>
    props.fontSize || 'var(--font-md)'};
  font-weight: ${(props: { fontWeight: string }) => props.fontWeight || '700'};
  background-color: ${(props: { $bgColor: string }) =>
    props.$bgColor || 'var(--main-color)'};
  border: ${(props: { $border: string }) => props.$border || 'none'};
  border-radius: ${(props: { $bdRadius: string }) => props.$bdRadius || '5px'};

  &:disabled {
    cursor: default;
    background-color: ${(props: { $disBgColor: string }) =>
      props.$disBgColor || 'var(--border-color)'};
    color: ${(props: { $disColor: string }) =>
      props.$disColor || 'var(--white)'};
    border: ${(props: { $disBorder: string }) => props.$disBorder || 'none'};
  }
`;

export default Button;
