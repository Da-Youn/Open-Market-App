import { useRef } from 'react';
import styled from 'styled-components';

import { media } from 'src/style/mediaQuery';
import { useGetProducts } from 'src/hooks/useProduct';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';

import ProductList from '../common/ProductList';
import ProductSkeleton from '../common/ProductSkeleton';

const HomeProductList = () => {
  const observeRef = useRef(null);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetProducts();

  useInfiniteScroll({
    ref: observeRef,
    callback: fetchNextPage,
    options: { threshold: 0.7 },
  });

  return (
    <ProductList
      data={data?.pages.flatMap((page) => page.results) || []}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
    >
      <div ref={observeRef} />
    </ProductList>
  );
};

export default HomeProductList;

export const NextBtn = styled.button`
  width: 500px;
  height: 70px;
  border: 3px solid var(--point-color);
  font-size: var(--font-lg);
  color: var(--point-color);
  border-radius: 20px;
  text-align: center;
  margin: 100px auto 0;

  &:hover {
    background-color: var(--point-color);
    color: #fff;
  }
  ${media.tablet(`
     width: 300px;
      `)}
`;
