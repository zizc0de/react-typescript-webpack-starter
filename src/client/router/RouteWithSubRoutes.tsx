import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IRoute } from './config';

const RouteWithSubRoutes = (route: IRoute): any => {
  const renderFunction = (props: {}): any => {
    if (route.redirect) {
      return <Redirect to={route.redirect} />;
    } else if (route.component) {
      return <route.component {...props} routes={route.routes} />;
    }

    return null;
  };

  return (
    <Suspense fallback={route.fallback}>
      <Route path={route.path} render={(props) => renderFunction(props)} />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
