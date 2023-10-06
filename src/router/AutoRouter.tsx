import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import ProductDetail from 'src/pages/ProductDetail/ProductDetail';
import { type } from '@testing-library/user-event/dist/type';

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
  {
    path: '/products/:id',
    element: <ProductDetail />,
    withAuthorization: false,
  },
];

interface AuthorizationProps {
  isAuthenticated: string | null;
  redirectTo: string;
  children: React.ReactNode;
}

const Authorization = ({
  isAuthenticated,
  redirectTo,
  children,
}: AuthorizationProps) => {
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

const AutoRouter = () => {
  const isAuthenticated: string | null = localStorage.getItem('token');

  return (
    <Router basename='/'>
      <Routes>
        {RouterInfo.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.withAuthorization ? (
                  <Authorization
                    isAuthenticated={isAuthenticated}
                    redirectTo='/account/login'
                  >
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
    </Router>
  );
};

export default AutoRouter;
