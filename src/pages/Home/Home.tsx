import Top from '../../components/common/Top';
import Banner from '../../components/Home/Banner';
import Footer from 'src/components/common/Footer';
import Header from '../../components/common/Header';
import ProductList from '../../components/Home/ProductList';

const Home = () => {
  return (
    <>
      <Header id='top' />
      <Banner />
      <ProductList />
      <Top />
      <Footer />
    </>
  );
};

export default Home;
