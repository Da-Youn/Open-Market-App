import React from 'react';
import Header from '../../components/common/Header';
import Banner from '../../components/common/Home/Banner';
import ProductList from '../../components/common/Home/ProductList';
import Top from '../../components/common/Top';

const Home: React.FC = () => {
  return (
    <>
      <Header id='top' />
      <Banner />
      <ProductList />
      <Top />
    </>
  );
};

export default Home;
