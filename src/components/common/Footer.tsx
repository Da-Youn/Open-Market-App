import styled from 'styled-components';

import YoutubeIcon from '../../assets/icon-yt.svg';
import FacebookIcon from '../../assets/icon-fb.svg';
import InstaIcon from '../../assets/icon-insta.svg';

const Footer = () => {
  return (
    <FooterWrap>
      <FooterContents>
        <NavWrap>
          <MoreNav>
            <ul>
              <li>
                <a href='/'>호두샵 소개</a>
              </li>
              <li>
                <a href='/'>이용약관</a>
              </li>
              <li>
                <a href='/'>개인정보처리방침</a>
              </li>
              <li>
                <a href='/'>전자금융거래약관</a>
              </li>
              <li>
                <a href='/'>청소년보호정책</a>
              </li>
              <li>
                <a href='/'>제휴문의</a>
              </li>
            </ul>
          </MoreNav>
          <SnsNav>
            <ul>
              <li>
                <a href='https://www.instagram.com'>
                  <img src={InstaIcon} alt='' />
                </a>
              </li>
              <li>
                <a href='https://www.facebook.com'>
                  <img src={FacebookIcon} alt='' />
                </a>
              </li>
              <li>
                <a href='https://www.youtube.com'>
                  <img src={YoutubeIcon} alt='' />
                </a>
              </li>
            </ul>
          </SnsNav>
        </NavWrap>
        <Info>
          <strong>(주)CORAL SHOP</strong>
          <p>경기도 수원시</p>
          <p>사업자 번호 : 000-0000-0000 | 통신판매업 </p>
          <p>대표 : 코랄코랄 </p>
        </Info>
      </FooterContents>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer`
  width: 100%;

  background-color: var(--sub-color);
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 50px;
`;

const FooterContents = styled.div`
  max-width: 1280px;
  width: 100%;
`;

const NavWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
`;
const MoreNav = styled.nav`
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
  }
  li {
    position: relative;
  }
  li:not(li:last-child)::after {
    content: '|';
    position: absolute;
    right: -14px;
  }
`;
const SnsNav = styled.nav`
  ul {
    display: flex;
    gap: 14px;
  }
`;

const Info = styled.div`
  align-self: flex-start;
  color: var(--sub-font-color);
  line-height: 24px;
  strong {
    font-weight: 700;
  }
`;
export default Footer;
