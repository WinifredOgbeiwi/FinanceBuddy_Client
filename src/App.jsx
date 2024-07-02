import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import { PATH } from './constants/util';
import Dashboard from './components/dashboard/Dashboard';
import Expenses from './components/dashboard/Expenses';
import Income from './components/dashboard/Income';
import Savings from './components/dashboard/Savings';
import Settings from './components/dashboard/Settings';
import { AuthorizedUser } from './constants/auth';
import Layout from './layout/Layout';

const App = () => {
  return (
    <>
      <Routes>
        <Route path={PATH.DEFAULT} element={<Navigate to={PATH.LOGIN} replace />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.RESETPASSWORD} element={<ResetPassword />} />

        {/* protected Paths */}
        <Route element={<Layout />} >
          <Route path={PATH.DASHBOARD} element={
            <AuthorizedUser><Dashboard /></AuthorizedUser>
          } />
          <Route path={PATH.EXPENSES} element={
            <AuthorizedUser><Expenses /></AuthorizedUser>
          } />
          <Route path={PATH.INCOME} element={
            <AuthorizedUser><Income /></AuthorizedUser>
          } />
          <Route path={PATH.SAVINGS} element={
            <AuthorizedUser><Savings /></AuthorizedUser>
          } />
          <Route path={PATH.SETTINGS} element={
            <AuthorizedUser><Settings /></AuthorizedUser>
          } />
        </Route>

      </Routes>
    </>
  );
};

export default App;
