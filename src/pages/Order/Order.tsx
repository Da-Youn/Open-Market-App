import Header from '../../components/common/Header.tsx';
import OrderContainer from 'src/components/Order/OrderContainer.tsx';
import Footer from 'src/components/common/Footer.tsx';

const Order = () => {
  return (
    <>
      <Header id='top' />
      <OrderContainer />
      <Footer />
    </>
  );
};

export default Order;
