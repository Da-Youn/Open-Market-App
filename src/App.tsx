import styled from 'styled-components';
import Router from './router/Router';
import GlobalStyle from './style/GlobalStyle';

const App = () => {
  return (
    <Wrap>
      <GlobalStyle />
      <Router />
    </Wrap>
  );
};

const Wrap = styled.div`
  min-width: 396px;
  font-size: var(--font-sm);
`;

export default App;
