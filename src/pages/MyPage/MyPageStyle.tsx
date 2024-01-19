import styled from 'styled-components';
import { media } from 'src/style/mediaQuery';

const MypageLayout = styled.main`
  max-width: 1280px;
  margin: auto;
  padding: 40px;
  h2 {
    font-size: var(--font-xl);
    font-weight: 700;
  }
`;

const MyPageHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 38px;
`;

const MyPageBox = styled.div`
  display: flex;
  gap: 50px;
  ${media.tablet(`
    flex-direction: column;
      `)}
`;

export { MypageLayout, MyPageHeader, MyPageBox };
