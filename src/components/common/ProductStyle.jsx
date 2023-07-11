import styled from 'styled-components';

export const ProductListWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductWrap = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 380px); /* 3개의 열을 동일한 너비로 설정 */
  padding-top: 80px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 70px;

  & .store-name {
    color: #767676;
    margin-bottom: 10px;
  }

  & .product-name {
    font-size: var(--font-md);
    margin-bottom: 10px;
  }

  & .price {
    font-size: var(--font-lg);
    font-weight: 700;
  }
`;

export const Product = styled.div`
  margin-bottom: 8px;
  img {
    width: 380px;
    height: 380px;
    object-fit: cover;
    object-position: 0 0;
    margin-bottom: 16px;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
  }
`;

export const NextBtn = styled.button`
  width: 500px;
  height: 70px;
  border: 3px solid var(--main-color);
  font-size: var(--font-lg);
  color: var(--main-color);
  border-radius: 20px;
  text-align: center;
  margin: 100px auto;

  &:hover {
    background-color: var(--main-color);
    color: #fff;
  }
`;
