import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import Router from './router/Router';

const App: React.FC = () => {
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
