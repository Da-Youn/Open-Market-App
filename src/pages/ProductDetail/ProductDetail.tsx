import styled from 'styled-components';

import Header from 'src/components/common/Header';
import Footer from 'src/components/common/Footer';
import ProductDetailCard from 'src/components/ProductDetail/ProductDetailCard';

const ProductDetail = () => {
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
  width: 100%;
  margin-top: 80px;
`;

export default ProductDetail;
