import styled, { keyframes } from 'styled-components';
import { media } from 'src/style/mediaQuery';
export interface SkeletonProps {}

const ProductSkeleton = (props: SkeletonProps) => {
  return (
    <SkeletonWrap>
      <SkeletonProduct>
        <SkeletonProductImg></SkeletonProductImg>
        <SkeletonProductStoreName></SkeletonProductStoreName>
        <SkeletonProductName></SkeletonProductName>
        <SkeletonProductPrice></SkeletonProductPrice>
      </SkeletonProduct>
      <SkeletonProduct>
        <SkeletonProductImg></SkeletonProductImg>
        <SkeletonProductStoreName></SkeletonProductStoreName>
        <SkeletonProductName></SkeletonProductName>
        <SkeletonProductPrice></SkeletonProductPrice>
      </SkeletonProduct>
      <SkeletonProduct>
        <SkeletonProductImg></SkeletonProductImg>
        <SkeletonProductStoreName></SkeletonProductStoreName>
        <SkeletonProductName></SkeletonProductName>
        <SkeletonProductPrice></SkeletonProductPrice>
      </SkeletonProduct>
    </SkeletonWrap>
  );
};

export default ProductSkeleton;

const loading = keyframes`
  0% {
    background-color: #ededed;
  }
  50% {
    background-color: #e2e2e2;
  }
  100% {
    background-color: #ededed;
  }
`;

const Skeleton = styled.div`
  background-color: #ededed;
  border-radius: 10px;
  animation: ${loading} 2s infinite ease-in-out;
`;

const SkeletonWrap = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 380px);
  padding-top: 30px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 70px;

  ${media.desktop(`
    grid-template-columns: repeat(2, 320px);
    gap: 50px;
      `)}
  ${media.mobile(`
    grid-template-columns: 1fr;
    gap: 30px;
      `)}
`;
const SkeletonProduct = styled.div`
  margin-bottom: 8px;
`;
const SkeletonProductImg = styled(Skeleton)`
  width: 380px;
  height: 380px;
  border-radius: 10px;
  margin-bottom: 16px;
  ${media.desktop(`
    width: 320px;
    height: 320px;
      `)}
  ${media.mobile(`
    width: 320px;
    height: 320px;
      `)}
`;

const SkeletonProductStoreName = styled(Skeleton)`
  border-radius: 6px;
  width: 80px;
  height: 16px;
  margin-bottom: 10px;
`;
const SkeletonProductName = styled(Skeleton)`
  border-radius: 6px;
  width: 180px;
  height: 18px;
  margin-bottom: 10px;
`;
const SkeletonProductPrice = styled(Skeleton)`
  border-radius: 6px;
  width: 120px;
  height: 24px;
  font-weight: 700;
`;
