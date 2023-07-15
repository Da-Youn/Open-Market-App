import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // '!'를 사용하여 null이 아님을 확신합니다.
root.render(<App />);
