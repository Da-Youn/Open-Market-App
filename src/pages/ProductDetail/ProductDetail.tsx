import styled from 'styled-components';

import ProductDetailCard from 'src/components/ProductDetail/ProductDetailCard';

const ProductDetail = () => {
  return (
    <>
      <Main>
        <ProductDetailCard />
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100%;
  margin-top: 80px;
`;

export default ProductDetail;
