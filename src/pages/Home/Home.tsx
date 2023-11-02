import Top from '../../components/common/Top';
import Banner from '../../components/Home/Banner';
import HomeProductList from '../../components/Home/HomeProductList';
import { HomeLayout } from './HomeStyle';

const Home = () => {
  return (
    <HomeLayout>
      <Banner />
      <HomeProductList />
      <Top />
    </HomeLayout>
  );
};

export default Home;
