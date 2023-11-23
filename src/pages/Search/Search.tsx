import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useGetSearchProducts } from 'src/hooks/useProduct';

import { media } from 'src/style/mediaQuery';
import ProductList from 'src/components/common/ProductList';

export interface SearchProps {}

const Search = (props: SearchProps) => {
  const { keyword } = useParams() as { keyword: string };
  const { data, isLoading } = useGetSearchProducts(keyword);

  if (keyword === null) return;

  return (
    !isLoading && (
      <SearchWrap>
        <ProductList data={data}>
          {data.length === 0 ? (
            <SearchResult>'{keyword}'에 대한 검색 결과가 존재하지 않습니다.</SearchResult>
          ) : (
            <SearchResult>'{keyword}'에 대한 검색 결과입니다.</SearchResult>
          )}
        </ProductList>
      </SearchWrap>
    )
  );
};

export default Search;

const SearchWrap = styled.main`
  padding: 50px;
  ${media.tablet(`
    padding: 30px 20px;
  `)}
`;
const SearchResult = styled.p`
  padding: 10px 50px;
  text-align: center;
  background-color: var(--hover-color);
  font-size: var(--font-lg);
  ${media.tablet(`
      font-size: var(--font-md);
  `)}
`;
