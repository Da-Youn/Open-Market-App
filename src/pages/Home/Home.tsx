import React from 'react';
import Top from '../../components/common/Top';
import Header from '../../components/common/Header';
import Banner from '../../components/common/Home/Banner';
import ProductList from '../../components/common/Home/ProductList';
import Footer from 'src/components/common/Footer';

const Home: React.FC = () => {
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
