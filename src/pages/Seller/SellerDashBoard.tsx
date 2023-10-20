import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from 'src/components/common/Button';
import ProductTable from 'src/components/Seller/DashBoard/ProductTable';
import SellerMenuBar from 'src/components/Seller/DashBoard/SellerMenuBar';

import PlusIcon from 'src/assets/icon-plus.svg';
export interface SellerProps {}

const SellerDashBoard = (props: SellerProps) => {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(`/seller/product-add`);
  };

  return (
    <SellerLayout>
      <SellerHeader>
        <h2>대시보드</h2>
        <UploadBtn
          onClick={handleBtnClick}
          width='168px'
          fontSize='var(--font-md)'
          fontWeight='400'
        >
          <img src={PlusIcon} alt='더하기 아이콘' />
          상품 업로드
        </UploadBtn>
      </SellerHeader>
      <SellerBox>
        <SellerMenuBar />
        <ProductTable />
      </SellerBox>
    </SellerLayout>
  );
};

const SellerLayout = styled.main`
  max-width: 1440px;
  margin: auto;
  padding: 40px;
  h2 {
    font-size: var(--font-xl);
    font-weight: 700;
  }
`;

const SellerHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 38px;
`;

const UploadBtn = styled(Button)`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const SellerBox = styled.div`
  display: flex;
  gap: 30px;
`;

export default SellerDashBoard;
