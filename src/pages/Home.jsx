import React, { useState } from 'react';
import Header from '../components/common/header/Header';
import Banner from '../components/common/Banner';
import ProductList from '../components/common/ProductList';
import Top from '../components/common/Top';
const Home = () => {
  return (
    <div>
      <Header id='top' />
      <Banner />
      <ProductList />
      <Top />
    </div>
  );
};

export default Home;
