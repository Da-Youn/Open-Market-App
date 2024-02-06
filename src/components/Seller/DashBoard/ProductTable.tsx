import styled from 'styled-components';

import { useGetSellerProducts } from 'src/hooks/useProduct';

import ProductItem from './ProductItem';
import { media } from 'src/style/mediaQuery';

const ProductTable = () => {
  const { productsData, isLoading } = useGetSellerProducts();

  if (!productsData || isLoading) return null;

  return (
    <ProductTableLayout>
      <ProductTableBox>
        <thead>
          <tr>
            <th>상품정보</th>
            <th>판매가격 </th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((itemDetail) => (
            <ProductItem key={itemDetail.product_id} itemDetail={itemDetail} />
          ))}
        </tbody>
      </ProductTableBox>
    </ProductTableLayout>
  );
};

const ProductTableLayout = styled.section`
  width: 100%;
  max-width: 1440px;
  height: 884px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: var(--sub-background-color);
  border: 1px solid var(--border-color);
  position: relative;
`;

const ProductTableBox = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead,
  tbody {
    background-color: #fff;
  }

  thead {
    width: 100%;
  }

  th {
    padding: 18px 0;
    display: fixed;
  }

  th {
    margin: 0px 30px;
    padding: 12px;
    vertical-align: middle;
    font-size: var(--font-md);
    border-bottom: 1px solid var(--border-color);
    ${media.tablet(`
      padding: 12px;
      font-size: var(--font-xs);
      `)}
  }
`;

export default ProductTable;
