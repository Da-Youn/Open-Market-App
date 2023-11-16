import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { media } from 'src/style/mediaQuery';
import ProductList from '../common/ProductList';

interface Product {
  product_id: string;
  image: string;
  store_name: string;
  product_name: string;
  price: number;
}

interface ProductListData {
  results: Product[];
  next: string;
}

const HomeProductList = () => {
  const [data, setData] = useState<Product[]>([]);
  const [nextPage, setNextPage] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://openmarket.weniv.co.kr/products/');
      const data: ProductListData = await response.json();
      setData(data.results);
      setNextPage(data.next);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextPage = async () => {
    try {
      const response = await fetch(nextPage);
      const data: ProductListData = await response.json();
      setData((prevData) => [...prevData, ...data.results]);
      setNextPage(data.next);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductList data={data}>
      {nextPage && <NextBtn onClick={fetchNextPage}>More</NextBtn>}
    </ProductList>
  );
};

export default HomeProductList;

export const NextBtn = styled.button`
  width: 500px;
  height: 70px;
  border: 3px solid var(--main-color);
  font-size: var(--font-lg);
  color: var(--main-color);
  border-radius: 20px;
  text-align: center;
  margin: 100px auto 0;

  &:hover {
    background-color: var(--main-color);
    color: #fff;
  }
  ${media.tablet(`
     width: 300px;
      `)}
`;
