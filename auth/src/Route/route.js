import React, {lazy} from 'react';
import LoginPage from '../Pages/Auth/Login/LoginPage';
import RegisterPage from '../Pages/Auth/Register/RegisterPage';
import RequestPassword from '../Pages/Auth/ResetPassword/RequestPassword';
import ResetPassword from '../Pages/Auth/ResetPassword/ResetPassword';
import HomePage from '../Pages/Dashboard/Home';

const routes = [
  {
    path: '/auth/login',
    exact: true,
    component: () => <LoginPage />
  },
  {
    path: '/auth/register',
    exact: true,
    component: () => <RegisterPage />
  },
  {
    path: '/auth/reset',
    exact: true,
    component: () => <RequestPassword />
  },
  {
    path: '/auth/reset/:token',
    exact: true,
    component: () => <ResetPassword />
  },
  {
    route: '*',
    component: HomePage,
    exact: true,
    routes: [
        {
          path: '/',
          exact: true,
          component: lazy(() => import('../Pages/Dashboard/Users/Users'))
        },
        {
          path: '/blacklist',
          exact: true,
          component: lazy(() => import('../Pages/Dashboard/Blacklist/Blacklist'))
        },
        {
          path: '/permissions',
          exact: true,
          component: lazy(() => import('../Pages/Dashboard/Permissions/Permissions'))
        },
        {
          path: '/logs',
          exact: true,
          component: lazy(() => import('../Pages/Dashboard/Logs/Logs'))
        },
        {
          path: '/sso/users',
          exact: true,
          component: lazy(() => import('../Pages/Dashboard/SSO/Users/SSOUsers'))
        },
        {
          path: '/sso/logs',
          exact: true,
          component: lazy(() => import('../Pages/Dashboard/SSO/Logs/SSOLogs'))
        },
    ]
  },
];

export default routes;