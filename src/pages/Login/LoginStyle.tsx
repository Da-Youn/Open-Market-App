import styled from 'styled-components';

const LoginWrap = styled.div`
  margin: 0px auto 130px;
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
