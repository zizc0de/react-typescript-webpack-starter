import React from 'react';
import { Switch } from 'react-router-dom';

import { IRoute } from './config';
import RouteWithSubRoutes from './RouteWithSubRoutes';

interface IProps {
  routes: IRoute[];
}

const Router: React.FC<IProps> = ({ routes }) => (
  <Switch>
    {routes &&
      routes.map((route: IRoute) => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
  </Switch>
);

export default Router;
