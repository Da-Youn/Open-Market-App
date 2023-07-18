import styled from 'styled-components';
import Button from '../../components/common/Button';

const LoginWrap = styled.div`
  margin: 130px auto 0;
  padding: 0 25px;
  header,
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main {
    margin: auto;
    max-width: 550px;
  }

  h1 {
    margin-bottom: 70px;
    img {
      width: 268px;
    }
  }
`;

const Input = styled.input`
  max-width: 480px;
  height: 60px;
  border-bottom: 1px solid
    ${(props: { error: boolean }) =>
      props.error ? 'var(--error-color)' : 'var(--border-color)'};
  margin-bottom: 10px;

  &::placeholder {
    font-size: 16px;
    color: var(--sub-font-color);
  }
`;
const LoginButton = styled(Button)`
  max-width: 480px;
  height: 60px;
  margin-top: 20px;
`;

const LinkWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  a {
    color: var(--font-color);
  }
`;

export { LoginWrap, Input, LoginButton, LinkWrap };
