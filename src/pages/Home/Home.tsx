import Top from '../../components/common/Top';
import Banner from '../../components/Home/Banner';
import HomeProductList from '../../components/Home/HomeProductList';
import * as S from './HomeStyle';

const Home = () => {
  return (
    <S.HomeLayout>
      <Banner />
      <HomeProductList />
      <Top />
    </S.HomeLayout>
  );
};

export default Home;
