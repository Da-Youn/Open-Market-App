import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const ProductList = () => {
  const navigate = useNavigate();
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
      {nextPage && <NextBtn onClick={fetchNextPage}>More</NextBtn>}
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

export const ProductBtn = styled.button`
  margin-bottom: 8px;
  text-align: left;
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
  margin: 100px auto 0;

  &:hover {
    background-color: var(--main-color);
    color: #fff;
  }
`;
