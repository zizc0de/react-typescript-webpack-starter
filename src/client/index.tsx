import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';

import App from './App';

import './styles/main.scss';

const renderApp = () => {
  const rootContent = document.getElementById('root');

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootContent,
  );
};

loadableReady(() => {
  renderApp();
});
