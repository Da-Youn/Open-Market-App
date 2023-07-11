import React, { useState, useEffect } from 'react';
import { ProductListWrap, ProductWrap, Product, NextBtn } from './ProductStyle';

export default function ProductList() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://openmarket.weniv.co.kr/products/');
      const data = await response.json();
      setData(data.results);
      setNextPage(data.next);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextPage = async () => {
    try {
      const response = await fetch(nextPage);
      const data = await response.json();
      setData((prevData) => [...prevData, ...data.results]);
      setNextPage(data.next);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductListWrap>
      <ProductWrap>
        {data.map((product) => (
          <Product key={product.product_id}>
            <img src={product.image} alt={product.product_name} />
            <p className='store-name'>{product.store_name}</p>
            <p className='product-name'>{product.product_name}</p>
            <p className='price'>{product.price.toLocaleString()}원</p>
          </Product>
        ))}
      </ProductWrap>
      {nextPage && <NextBtn onClick={fetchNextPage}>More</NextBtn>}
    </ProductListWrap>
  );
}
