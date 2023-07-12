import React from 'react';
import Header from '../../components/common/header/Header.tsx';
import Banner from '../../components/common/Banner.tsx';
import ProductList from '../../components/common/ProductList.tsx';
import Top from '../../components/common/Top.tsx';

export default function Home() {
  return (
    <>
      <Header id='top' />
      <Banner />
      <ProductList />
      <Top />
    </>
  );
}
