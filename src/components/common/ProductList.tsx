import React, { useState, useEffect } from 'react';
import { ProductListWrap, ProductWrap, Product, NextBtn } from './ProductStyle';

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

export default function ProductList() {
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
