import styled from 'styled-components';

export default function TOP() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <TopWrap>
      <button onClick={scrollToTop}>↑</button>
    </TopWrap>
  );
}

const TopWrap = styled.article`
  width: 60px;
  height: 60px;
  background-color: var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: fixed;
  bottom: 50px;
  right: 50px;
  button {
    color: #fff;
    font-weight: 700;
    font-size: var(--font-lg);
  }
`;
