import styled, { css } from 'styled-components';
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

const LinkWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  a {
    color: var(--font-color);
  }
`;

export { LoginWrap, LinkWrap };
