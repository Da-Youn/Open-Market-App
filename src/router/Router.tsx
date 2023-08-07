import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Cart from '../pages/Cart/Cart';
import ProductDetail from 'src/pages/ProductDetail/ProductDetail';
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/account' element={<Outlet />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='/my' element={<Outlet />}>
          <Route path='page' element={<Login />} />
          <Route path='seller_center' element={<Signup />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:id' element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
