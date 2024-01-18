import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ProductRes } from 'src/hooks/useProduct';

import { media } from 'src/style/mediaQuery';

interface Product {
  product_id: string;
  image: string;
  store_name: string;
  product_name: string;
  price: number;
}

export interface ProductListProps {
  data: Product[] | ProductRes;
  children?: ReactNode;
}

const ProductList = ({ data, children }: ProductListProps) => {
  const navigate = useNavigate();
  return (
    <ProductListWrap>
      <ProductWrap>
        {data.map((product) => (
          <ProductBtn
            key={product.product_id}
            onClick={() =>
              navigate(`/product/${product.product_id}`, {
                state: product.product_id,
              })
            }
          >
            <img src={product.image} alt={product.product_name} />
            <p className='store-name'>{product.store_name}</p>
            <p className='product-name'>{product.product_name}</p>
            <p className='price'>{product.price.toLocaleString()}원</p>
          </ProductBtn>
        ))}
      </ProductWrap>
      {children}
      {/* {nextPage && <NextBtn onClick={fetchNextPage}>More</NextBtn>} */}
    </ProductListWrap>
  );
};

export default ProductList;

export const ProductListWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductWrap = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 380px); /* 3개의 열을 동일한 너비로 설정 */
  padding-top: 30px;
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

  ${media.desktop(`
    grid-template-columns: repeat(2, 320px);
    gap: 50px;
      `)}
  ${media.mobile(`
    grid-template-columns: 1fr;
    gap: 30px;
      `)}
`;

export const ProductBtn = styled.button`
  margin-bottom: 8px;
  text-align: left;
  img {
    background-color: #ededed;
    width: 380px;
    height: 380px;
    object-fit: cover;
    object-position: 0 0;
    margin-bottom: 16px;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    ${media.desktop(`
    width: 320px;
    height: 320px;
      `)}
    ${media.mobile(`
    width: 320px;
    height: 320px;
      `)}
  }
`;
