import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';

interface UserInput {
  username: string;
  password: string;
}

interface TypeChangeProps {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  setValue?: UseFormSetValue<UserInput>;
  page: string;
}

const TypeChange = ({ userType, setUserType, setValue, page }: TypeChangeProps) => {
  const handleBuyerLogin = () => {
    setUserType('BUYER');
    if (setValue) {
      setValue('username', 'buyer1');
      setValue('password', 'hodu0910');
    }
  };

  const handleSellerLogin = () => {
    setUserType('SELLER');
    if (setValue) {
      setValue('username', 'seller1');
      setValue('password', 'hodu0910');
    }
  };

  return (
    <TypeChangeWrap>
      <h2 className='a11y-hidden'>회원 종류 선택하기</h2>
      <TypeChangeBtn
        className={`type-btn ${userType === 'BUYER' ? '' : 'disable'}`}
        type='button'
        onClick={handleBuyerLogin}
      >
        구매회원 {page === 'login' ? '로그인' : '가입'}
      </TypeChangeBtn>
      <TypeChangeBtn
        className={`type-btn ${userType === 'SELLER' ? '' : 'disable'}`}
        type='button'
        onClick={handleSellerLogin}
      >
        판매회원 {page === 'login' ? '로그인' : '가입'}
      </TypeChangeBtn>
    </TypeChangeWrap>
  );
};

const TypeChangeWrap = styled.div`
  display: flex;
  background-color: var(--primary);
  gap: 16px;
  width: 100%;
  margin-bottom: 36px;
`;

const TypeChangeBtn = styled.button`
  font-size: var(--font-md);
  z-index: 100;
  transition: 0.3s;
  &.type-btn {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 20px 0;
    color: var(--white);
    background-color: var(--point-color);
  }

  &.disable {
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--font-color);
  }
`;

export default TypeChange;
