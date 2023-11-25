import styled from 'styled-components';
import { media } from 'src/style/mediaQuery';

export const SignupInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  label {
    color: var(--sub-font-color);
  }
`;

export const InputBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  gap: 12px;
`;

export const AuthInputBox = styled(InputBox)`
  ${media.tablet(`
    flex-direction: column;
    align-items: flex-end;
    button{
      height:40px;
    }      
      `)}
`;

export const InputStyle = styled.input`
  width: 100%;
  height: 54px;
  padding: 0 0 0 16px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
`;

export const PhoneNumInputStyle = styled(InputStyle)`
  flex: 1;
`;

export const ErrorMsg = styled.p`
  margin-bottom: 6px;
  color: var(--error-color);
`;

export const ValidMsg = styled.p`
  margin-bottom: 6px;
  color: var(--main-color);
`;

export const CheckIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
`;

// 첫번째 휴대폰 번호 드롭다운 스타일
export const FirstNumWrap = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  ul {
    text-align: center;
    height: 150px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background-color: var(--white);
    overflow-y: scroll;
    width: 100%;
    left: 0;
    top: 60px;

    li {
      button {
        width: 100%;
        padding: 5px 0;
      }
      button:hover {
        background-color: var(--main-color);
        color: var(--white);
      }
    }
  }

  ul::-webkit-scrollbar {
    background-color: var(--sub-color);
    width: 18px;
  }
  ul::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--border-color);
    background-clip: padding-box;
    border: 5px solid transparent;
  }
`;

export const FirstNumDropBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-right: 14px;
  width: 100%;
  span {
    flex: 9;
  }
  img {
    flex: 1;
    vertical-align: bottom;
  }

  padding-left: 16px;
  height: 54px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
`;
