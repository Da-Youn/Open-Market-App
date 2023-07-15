import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import GlobalStyle from './styles/GlobalStyle';
import Signup from './pages/Signup/Signup';
const App: React.FC = () => {
  return (
    <Wrap>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/account' element={<Outlet />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-width: 396px;
`;

export default App;
