import styled from 'styled-components';
import { media } from 'src/style/mediaQuery';

export const SignupWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const BannerSection = styled.section`
  padding: 32px;
  flex: 4;
  height: 100%;
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
export const SignupSection = styled.section`
  flex: 6;
  min-width: 360px;
  height: 100%;
  padding: 60px 25px;
  overflow-y: scroll;
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
