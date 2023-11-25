import React, { forwardRef, MouseEventHandler, ChangeEventHandler } from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';

export interface InputValues {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  firstNum: string;
  secondNumber: string;
  lastNumber: string;
  name: string;
  company_registration_number?: string;
  store_name?: string;
}

export type InputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  isValid?: string | null;
  validation?: RegisterOptions;
  btnactive?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  setFirstNum?: React.Dispatch<React.SetStateAction<string>>;
  firstNum?: string;
};
