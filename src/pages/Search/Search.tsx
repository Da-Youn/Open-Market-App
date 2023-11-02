import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useGetSearchProducts } from 'src/hooks/useProduct';

import ProductList from 'src/components/common/ProductList';

export interface SearchProps {}

const Search = (props: SearchProps) => {
  const location = useLocation();
  const { keyword } = useParams() as { keyword: string };
  const { data, isLoading } = useGetSearchProducts(keyword);
  console.log(data);
  if (keyword === null) return;

  return !isLoading && <ProductList data={data} />;
};

export default Search;
