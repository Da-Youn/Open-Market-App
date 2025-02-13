import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Order from '../pages/Order/Order';
import Search from '../pages/Search/Search';
import Signup from '../pages/Auth/Signup';
import MyPage from 'src/pages/MyPage/MyPage';
import SellerDashBoard from 'src/pages/Seller/SellerDashBoard';
import ProductForm from 'src/pages/Seller/ProductForm';
import ProductDetail from 'src/pages/ProductDetail/ProductDetail';

import Header from 'src/components/common/Header';
import Footer from 'src/components/common/Footer';

import { getStorageItem } from 'src/util/handleStorageItem';

type RouterItem = {
  path: string;
  element: JSX.Element;
  withAuthorization: boolean;
  search?: string;
};

const RouterInfo: RouterItem[] = [
  { path: '/', element: <Home />, withAuthorization: false },
  {
    path: '/search/:keyword',
    element: <Search />,
    withAuthorization: false,
  },
  { path: '/account/login', element: <Login />, withAuthorization: false },
  { path: '/account/signup', element: <Signup />, withAuthorization: false },
  { path: '/my/page', element: <MyPage />, withAuthorization: true },

  { path: '/my/cart', element: <Cart />, withAuthorization: true },
  { path: '/my/order', element: <Order />, withAuthorization: true },
  {
    path: '/seller/dashboard',
    element: <SellerDashBoard />,
    withAuthorization: true,
  },
  {
    path: '/seller/product-add',
    element: <ProductForm type='add' />,
    withAuthorization: true,
  },
  {
    path: '/seller/product-edit',
    element: <ProductForm type='edit' />,
    withAuthorization: true,
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
    withAuthorization: false,
  },
];

interface AuthorizationProps {
  redirectTo: string;
  children: React.ReactNode;
}

const Authorization = ({ redirectTo, children }: AuthorizationProps) => {
  const isAuthenticated = getStorageItem('token');
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

const AutoRouter = () => {
  return (
    <Router basename='/'>
      <Header id='top' />
      <Routes>
        {RouterInfo.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.withAuthorization ? (
                  <Authorization redirectTo='/account/login'>
                    {route.element}
                    {route.path.startsWith('/account') ? null : <Footer />}
                  </Authorization>
                ) : (
                  <>
                    {route.element}
                    {route.path.startsWith('/account') ? null : <Footer />}
                  </>
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default AutoRouter;
