import React from 'react';
import { useRoutes } from 'react-router-dom';
import loadable from '@loadable/component';

const Loading = () => <div>Loading...</div>;

const Hello = loadable(
  () => import(/* webpackChunkName: "Hello" */ './components/Hello'),
  {
    fallback: <Loading />,
  },
);

const config = [
  {
    path: '/hello',
    element: <Hello />,
  },
];

const AppRoutes = () => {
  return useRoutes(config);
};

export default AppRoutes;
