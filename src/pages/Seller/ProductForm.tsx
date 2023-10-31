import styled from 'styled-components';

import ProductAddForm from 'src/components/Seller/ProductAddForm';
import ProductEditForm from 'src/components/Seller/ProductEditForm';
export interface ProductResistrationProps {
  type: string;
}

const ProductAdd = ({ type }: ProductResistrationProps) => {
  return (
    <ProductAddLayout>
      <h2>상품 {type === 'add' ? '등록' : '수정'}</h2>
      <ProductAddBox>
        <ProductAddNote>
          <p>*상품 등록 주의사항</p>
          <div>
            - 너무 귀여운 사진은 심장이 아파올 수 있습니다.
            <br />
            <br />
            - 유소년에게서 천자만홍이 피고 이상이 온갖 들어 약동하다. 이상의
            가지에 사랑의 있는가? 주며, 끓는 힘차게 얼음이 얼음 가치를
            황금시대의 있음으로써 사라지지 것이다. 이 뜨거운지라, 이상의 속에서
            이것은 피가 보배를 황금시대의 싹이 사막이다.
            <br />
            <br />- 자신과 우는 옷을 지혜는 아니다. 더운지라 설레는 기쁘며,
            위하여서, 평화스러운 광야에서 그리하였는가? 소담스러운 위하여
            인도하겠다는 어디 무엇을 이상을 같지 따뜻한 청춘 칼이다.
            <br />
            <br />- 가치를 그들을 예수는 찬미를 가슴이 과실이 이것이다. 희망의
            것이다.보라, 풍부하게 이것은 황금시대를 얼마나 인간에 돋고,
            이것이다.
          </div>
        </ProductAddNote>
        {/* 페이지 타입에 따라 폼컴포넌트 렌더링 */}
        {type === 'add' && <ProductAddForm />}
        {type === 'edit' && <ProductEditForm />}
      </ProductAddBox>
    </ProductAddLayout>
  );
};

const ProductAddLayout = styled.main`
  max-width: 1440px;
  margin: auto;
  padding: 40px;
  h2 {
    height: 54px;
    font-size: var(--font-xl);
    font-weight: 700;
    margin-bottom: 40px;
    line-height: 54px;
  }
`;

const ProductAddBox = styled.div`
  display: flex;
  gap: 50px;
`;
const ProductAddNote = styled.section`
  p {
    margin-bottom: 10px;
    color: var(--error-color);
  }
  div {
    width: 300px;
    padding: 20px;
    line-height: normal;
    box-sizing: border-box;
    word-break: keep-all;
    font-size: var(--font-xs);
    background-color: var(--hover-color);
  }
`;

export default ProductAdd;
