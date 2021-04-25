import React, {lazy} from 'react';
import LoginPage from '../Pages/Auth/Login/LoginPage';
import RegisterPage from '../Pages/Auth/Register/RegisterPage';
import RequestPassword from '../Pages/Auth/ResetPassword/RequestPassword';

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
  }
];

export default routes;