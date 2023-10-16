import Top from '../../components/common/Top';
import Banner from '../../components/Home/Banner';
import ProductList from '../../components/Home/ProductList';
import { HomeLayout } from './HomeStyle';

const Home = () => {
  return (
    <HomeLayout>
      <Banner />
      <ProductList />
      <Top />
    </HomeLayout>
  );
};

export default Home;
