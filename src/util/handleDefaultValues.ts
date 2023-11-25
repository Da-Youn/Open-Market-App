interface FormValue {
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

export const setSignupInputValues = (userType: string) => {
  if (userType === 'BUYER') {
    return {
      username: '',
      password: '',
      password2: '',
      phone_number: '',
      secondNumber: '',
      lastNumber: '',
      name: '',
    };
  } else if (userType === 'SELLER') {
    return {
      username: '',
      password: '',
      password2: '',
      phone_number: '',
      secondNumber: '',
      lastNumber: '',
      name: '',
      company_registration_number: '',
      store_name: '',
    };
  }
};
export const getSignupInputValues = (data: FormValue, userType: string, firstNum: string) => {
  if (userType === 'BUYER') {
    return {
      username: data.username,
      password: data.password,
      password2: data.password2,
      phone_number: `${firstNum}${data.secondNumber}${data.lastNumber}`,
      name: data.name,
    };
  } else if (userType === 'SELLER') {
    return {
      username: data.username,
      password: data.password,
      password2: data.password2,
      phone_number: `${firstNum}${data.secondNumber}${data.lastNumber}`,
      name: data.name,
      company_registration_number: data.company_registration_number,
      store_name: data.store_name,
    };
  }
};
