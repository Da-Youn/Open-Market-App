import styled from 'styled-components';

import MyPageMenuBar from 'src/components/MyPage/MyPageMenuBar';
import MyPageOrder from 'src/components/MyPage/MyPageOrder/MyPageOrder';

export interface MyPageProps {}

const MyPage = (props: MyPageProps) => {
  return (
    <MypageLayout>
      <MyPageHeader>
        <h2>마이페이지</h2>
      </MyPageHeader>
      <MyPageBox>
        <MyPageMenuBar />
        <MyPageOrder />
      </MyPageBox>
    </MypageLayout>
  );
};

const MypageLayout = styled.main`
  max-width: 1280px;
  margin: auto;
  padding: 40px;
  h2 {
    font-size: var(--font-xl);
    font-weight: 700;
  }
`;

const MyPageHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 38px;
`;

const MyPageBox = styled.div`
  display: flex;
  gap: 50px;
`;

export default MyPage;
