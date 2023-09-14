import React from 'react';
import Header from '../../components/common/Header.tsx';
import Footer from 'src/components/common/Footer.tsx';
import CartForm from 'src/components/Cart/CartForm.tsx';
export default function Cart() {
  return (
    <div>
      <Header id='top' />
      <CartForm />
      <Footer />
    </div>
  );
}
