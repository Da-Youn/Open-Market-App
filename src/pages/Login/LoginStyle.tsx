import styled from 'styled-components';
import { media } from 'src/style/mediaQuery';
const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const BannerSection = styled.section`
  padding: 32px;
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 54px;
  align-items: center;
  background-color: var(--main-color);
  img {
    width: 100%;
    max-width: 500px;
  }
  p {
    color: var(--white);
    font-size: var(--font-lg);
    font-weight: 500;
  }
  ${media.tablet(`
    display:none;
      `)}
`;
const LoginSection = styled.section`
  flex: 6;
  min-width: 360px;
  padding: 60px 25px;
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
  gap: 12px;
  a {
    font-size: var(--font-md);
    color: var(--font-color);
    font-weight: 700;
  }
`;

export { LoginWrap, LinkWrap, LoginSection, BannerSection };
