import styled, { keyframes } from 'styled-components';
import { media } from 'src/style/mediaQuery';
export interface SkeletonProps {}

const ProductSkeleton = (props: SkeletonProps) => {
  return (
    <>
      <SkeletonProduct>
        <SkeletonProductImg></SkeletonProductImg>
        <SkeletonProductStoreName></SkeletonProductStoreName>
        <SkeletonProductName></SkeletonProductName>
        <SkeletonProductLine></SkeletonProductLine>
        <SkeletonProductPrice></SkeletonProductPrice>
      </SkeletonProduct>
    </>
  );
};

export default ProductSkeleton;

const loading = keyframes`
  0% {
    background-color: #ededed;
  }
  50% {
    background-color: #cdcdcd;
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

const SkeletonProduct = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

const SkeletonProductImg = styled(Skeleton)`
  width: 100%;
  height: 0;
  padding-top: 100%;
  border-radius: 6px;
  margin-bottom: 16px;
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
const SkeletonProductLine = styled.div`
  margin: 10px 0;
  border-bottom: 1px solid #ededed;
`;
const SkeletonProductPrice = styled(Skeleton)`
  border-radius: 6px;
  width: 120px;
  height: 30px;
  font-weight: 700;
`;
