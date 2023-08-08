import React, { useEffect } from 'react';
import Header from 'src/components/common/Header';
import ProductDetailCard from 'src/components/common/ProductDetail/ProductDetailCard';
import Footer from 'src/components/common/Footer';
import styled from 'styled-components';
export interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  return (
    <>
      <Header id='top'></Header>
      <Main>
        <ProductDetailCard />
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  max-width: 1280px;
  width: 100%;
  margin-top: 80px;
  padding: 0 320px;
`;

export default ProductDetail;
