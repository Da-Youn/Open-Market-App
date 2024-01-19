import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ProductRes } from 'src/hooks/useProduct';
import ProductSkeleton from './ProductSkeleton';

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
  isFetchingNextPage: boolean;
  isLoading: boolean;
}
const ProductList = ({ data, children, isFetchingNextPage, isLoading }: ProductListProps) => {
  const navigate = useNavigate();
  return (
    <ProductListWrap>
      <ProductWrap>
        {isLoading && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
        {data.map((product) => (
          <ProductBtn
            key={product.product_id}
            onClick={() =>
              navigate(`/product/${product.product_id}`, {
                state: product.product_id,
              })
            }
          >
            <ProductImg>
              <img src={product.image} alt={product.product_name} />
            </ProductImg>
            <p className='store-name'>{product.store_name}</p>
            <p className='product-name'>{product.product_name}</p>
            <p className='price'>
              {product.price.toLocaleString()}
              <span>원</span>
            </p>
          </ProductBtn>
        ))}
        {isFetchingNextPage && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
      </ProductWrap>
      {children}
      {/* {nextPage && <NextBtn onClick={fetchNextPage}>More</NextBtn>} */}
    </ProductListWrap>
  );
};

export default ProductList;

export const ProductListWrap = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
`;
export const ProductImg = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  margin-bottom: 16px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    background-color: #ededed;
    object-fit: cover;
    object-position: 50% 0;
    border-radius: 10px;
  }
`;

export const ProductWrap = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  padding-top: 40px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 40px;

  & .store-name {
    color: #767676;
    margin-bottom: 10px;
  }

  & .product-name {
    font-size: var(--font-md);
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ededed;
    font-weight: 500;
  }

  & .price {
    font-size: var(--font-lg);
    font-weight: 700;
    span {
      margin-left: 4px;
      font-weight: 400;
      font-size: var(--font-md);
    }
  }
`;

export const ProductBtn = styled.button`
  width: 100%;

  margin-bottom: 8px;
  text-align: left;

  &:hover {
    img {
      transform: scale(1.03);
    }
  }
`;
