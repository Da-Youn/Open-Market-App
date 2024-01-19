import styled from 'styled-components';
import { media } from 'src/style/mediaQuery';

import Img from 'src/assets/banner_1.jpg';

export const AuthWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const BannerSection = styled.section`
  padding: 32px;
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 54px;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${Img});
  background-position: 0 50%;

  img {
    width: 100%;
    max-width: 500px;
  }
  p {
    color: var(--white);
    font-size: 20px;
  }

  ${media.tablet(`
    display:none;
      `)}
`;
export const AuthSection = styled.section`
  flex: 6;
  min-width: 360px;
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

export const LinkWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  a {
    font-size: var(--font-md);
    color: var(--font-color);
    font-weight: 700;
  }
`;
