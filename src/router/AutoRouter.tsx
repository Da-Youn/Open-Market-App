import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Order from '../pages/Order/Order';
import Signup from '../pages/Signup/Signup';
import ProductDetail from 'src/pages/ProductDetail/ProductDetail';

import Header from 'src/components/common/Header';
import Footer from 'src/components/common/Footer';

type RouterItem = {
  path: string;
  element: JSX.Element;
  withAuthorization: boolean;
};

const RouterInfo: RouterItem[] = [
  { path: '/', element: <Home />, withAuthorization: false },
  { path: '/account/login', element: <Login />, withAuthorization: false },
  { path: '/account/signup', element: <Signup />, withAuthorization: false },
  { path: '/my/page', element: <Login />, withAuthorization: true },
  { path: '/my/seller_center', element: <Signup />, withAuthorization: true },
  { path: '/my/cart', element: <Cart />, withAuthorization: true },
  { path: '/my/order', element: <Order />, withAuthorization: true },
  {
    path: '/products/:id',
    element: <ProductDetail />,
    withAuthorization: false,
  },
];

interface AuthorizationProps {
  redirectTo: string;
  children: React.ReactNode;
}

const Authorization = ({ redirectTo, children }: AuthorizationProps) => {
  const isAuthenticated: string | null = localStorage.getItem('token');
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
                  </Authorization>
                ) : (
                  route.element
                )
              }
            />
          );
        })}
      </Routes>
      <Footer />
    </Router>
  );
};

export default AutoRouter;
