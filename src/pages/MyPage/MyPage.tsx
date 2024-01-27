import MyPageMenuBar from 'src/components/MyPage/MyPageMenuBar';
import MyPageOrder from 'src/components/MyPage/MyPageOrder/MyPageOrder';

import * as S from './MyPageStyle';

export interface MyPageProps {}

const MyPage = (props: MyPageProps) => {
  return (
    <S.MypageLayout>
      <S.MyPageHeader>
        <h2>마이페이지</h2>
      </S.MyPageHeader>
      <S.MyPageBox>
        <MyPageMenuBar />
        <MyPageOrder />
      </S.MyPageBox>
    </S.MypageLayout>
  );
};

export default MyPage;
