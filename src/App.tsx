import styled from 'styled-components';
import AutoRouter from './router/AutoRouter';
import GlobalStyle from './style/GlobalStyle';

const App = () => {
  return (
    <Wrap>
      <GlobalStyle />
      <AutoRouter />
    </Wrap>
  );
};

const Wrap = styled.div`
  min-width: 396px;
  padding-top: 90px;
  font-size: var(--font-sm);
`;

export default App;
