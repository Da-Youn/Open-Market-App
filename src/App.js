import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login.tsx';
import Home from './pages/Home/Home.tsx';
import Cart from './pages/Cart/Cart.tsx';
import GlobalStyle from './styles/GlobalStyle';
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/accounts/login/*' element={<Login />} />
          <Route path='/accounts/cart/*' element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
