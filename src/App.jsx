import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ResetPassword from './components/auth/ResetPassword'
import { PATH } from './constants/util'
import Dashboard from './components/dashboard/Dashboard'
import Expenses from './components/dashboard/Expenses'
import Income from './components/dashboard/Income'
import Savings from './components/dashboard/Savings'
import Settings from './components/dashboard/Settings'

const App = () => {
  return (
    <>
      <Routes>
        <Route path={PATH.DEFAULT} element={<Navigate to={PATH.LOGIN} replace />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.RESETPASSWORD} element={<ResetPassword />} />

        {/* protected Path */}
        <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        <Route path={PATH.EXPENSES} element={<Expenses />} />
        <Route path={PATH.INCOME} element={<Income />} />
        <Route path={PATH.SAVINGS} element={<Savings />} />
        <Route path={PATH.SETTINGS} element={<Settings />} />
      </Routes>
    </>
  )
}

export default App
