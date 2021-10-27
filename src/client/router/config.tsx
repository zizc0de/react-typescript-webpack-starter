import React, {
  ComponentType,
  lazy,
  LazyExoticComponent,
  ReactNode,
} from 'react';

export interface IRoute {
  // Path, like in basic prop
  path: string;
  // Exact, like in basic prop
  exact: boolean;
  // Preloader for lazy loading
  fallback: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  component?: LazyExoticComponent<ComponentType<any>>;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
}

export const routes: IRoute[] = [
  {
    exact: true,
    fallback: <div>{'Loading...'}</div>,
    path: '/',
    redirect: '/todo',
  },
  {
    component: lazy(() => import('../components/Todo')),
    exact: false,
    fallback: <div>{'Loading...'}</div>,
    path: '/todo',
  },
];
