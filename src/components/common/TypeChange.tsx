import styled from 'styled-components';

interface TypeChangeProps {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
  page: string;
}

const TypeChange = (props: TypeChangeProps) => {
  const handleBuyerLogin = () => {
    props.setUserType('BUYER');
  };

  const handleSellerLogin = () => {
    props.setUserType('SELLER');
  };

  return (
    <TypeChangeWrap>
      <h2 className='a11y-hidden'>회원 종류 선택하기</h2>
      <TypeChangeBtn
        className={`type-btn ${props.userType === 'BUYER' ? '' : 'disable'}`}
        type='button'
        onClick={handleBuyerLogin}
      >
        구매회원 {props.page === 'login' ? '로그인' : '가입'}
      </TypeChangeBtn>
      <TypeChangeBtn
        className={`type-btn ${props.userType === 'SELLER' ? '' : 'disable'}`}
        type='button'
        onClick={handleSellerLogin}
      >
        판매회원 {props.page === 'login' ? '로그인' : '가입'}
      </TypeChangeBtn>
    </TypeChangeWrap>
  );
};

const TypeChangeWrap = styled.div`
  display: flex;
  background-color: var(--primary);
  width: 100%;
`;

const TypeChangeBtn = styled.button`
  font-size: var(--font-md);
  z-index: 100;

  &.type-btn {
    width: 100%;
    height: 70px;
    border-top: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-radius: 10px 10px 0 0;
    padding: 20px 0 38px;
    font-weight: 700;
    background-color: var(--white);
  }

  &.disable {
    background-color: var(--sub-color);
    border-bottom: 1px solid var(--border-color);
  }
`;

export default TypeChange;
