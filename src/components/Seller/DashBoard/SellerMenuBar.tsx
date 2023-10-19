import styled from 'styled-components';

export interface SellerMenuBarProps {}

const SellerMenuBar = (props: SellerMenuBarProps) => {
  return (
    <SellerMenuBarLayout>
      <ul>
        <li>
          <button>
            판매중인 상품(3) <span>1</span>
          </button>
        </li>
        <li>
          <button>
            주문/배송<span>2</span>
          </button>
        </li>
        <li>
          <button>
            문의/리뷰<span>2</span>
          </button>
        </li>
        <li>
          <button>통계</button>
        </li>
        <li>
          <button>스토어 설정 </button>
        </li>
      </ul>
    </SellerMenuBarLayout>
  );
};

const SellerMenuBarLayout = styled.section`
  width: 100%;
  max-width: 250px;

  ul {
    width: 100%;
    border-radius: 5px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
  }

  li {
    position: relative;
  }

  li:not(li:last-child)::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translate(-50%, 0);
    height: 1px;
    width: 220px;
    background-color: var(--sub-color);
  }

  button {
    width: 100%;
    height: 50px;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    border-radius: 5px;
    border: 1.5px solid var(--main-color);
    box-shadow: 0px 1px 2px 0px rgba(118, 118, 118, 0.25);
  }

  span {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    color: var(--white);
    border-radius: 50%;
    background-color: var(--main-color);
  }

  button:hover {
    background: var(--hover-color);
  }

  button:focus {
    background: var(--main-color);
    color: var(--white);
    span {
      background: var(--white);
      color: var(--main-color);
    }
  }
`;

export default SellerMenuBar;
