import React from 'react';

import Router from './router/Router';
import { routes } from './router/config';

const App: React.FC<{}> = () => (
  <div>
    <Router routes={routes} />
  </div>
);

export default App;
